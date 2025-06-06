import sys
import os
import re
import pathlib
from pathlib import Path
import shutil

"""
Special cases:

- iframe 
- div table 
- begin{align
- empty 
- latex, between $$ and $$
"""

def fix_indentation(text):
    """Process text to handle indentation and wrap in Hugo shortcode blocks."""
    lines = text.split('\n')
    result = []
    in_code_block = False
    in_table = False
    in_latex = False
    in_math = False
    indented_block = []
    iframe_block = []
    
    for line in lines:
        # Handle math mode
        if '$$' in line:
            # If this line both starts and ends math mode
            if line.count('$$') == 2:
                result.append(line)
                continue
                
            in_math = not in_math
            result.append(line)
            continue
            
        if in_math:
            result.append(line)
            continue
            
        # Handle iframe
        if '<iframe' in line:
            iframe_block = [line]
            continue
        elif iframe_block:
            iframe_block.append(line)
            if '</iframe>' in line:
                result.extend(iframe_block)
                iframe_block = []
            continue
            
        # Handle LaTeX align environment
        if '\\begin{align' in line:
            in_latex = True
            result.append(line)
            continue
        elif '\\end{align' in line:
            in_latex = False
            result.append(line)
            continue
        
        if in_latex:
            result.append(line)
            continue
            
        # Rest of the processing
        if '<table' in line or '<div' in line:
            in_table = True
        elif '</table>' in line or '</div>' in line:
            in_table = False
            result.append(line)
            continue
            
        if line.strip().startswith('```'):
            if indented_block:
                if any(l.strip() for l in indented_block):
                    result.append('{{< indentedblock >}}')
                    result.extend(indented_block)
                    result.append('{{< /indentedblock >}}')
                indented_block = []
            in_code_block = not in_code_block
            result.append(line)
            continue
        
        if in_code_block or in_table:
            result.append(line)
            continue
            
        if line.strip().startswith('!['):
            if indented_block:
                if any(l.strip() for l in indented_block):
                    result.append('{{< indentedblock >}}')
                    result.extend(indented_block)
                    result.append('{{< /indentedblock >}}')
                indented_block = []
            result.append(line)
            continue
            
        is_indented = line != line.lstrip()
        has_content = bool(line.strip())
        
        if is_indented or (indented_block and not has_content):
            indented_block.append(line)
        else:
            if indented_block and any(l.strip() for l in indented_block):
                result.append('{{< indentedblock >}}')
                result.extend(indented_block)
                result.append('{{< /indentedblock >}}')
            indented_block = []
            result.append(line.lstrip())
    
    if indented_block and any(l.strip() for l in indented_block):
        result.append('{{< indentedblock >}}')
        result.extend(indented_block)
        result.append('{{< /indentedblock >}}')
    
    return '\n'.join(result)

if __name__ == '__main__':
    arg1 = sys.argv[1]
    arg2 = sys.argv[2]
    
    # make sure the file exists
    assert os.path.exists(arg1), f'The file of {arg1} does not exist'
    
    notebook_folder_name = re.findall(r'^.+?(?=\/)', arg1)[0]  # e.g., 'notebooks'
    files_folder = re.sub('.ipynb', '_files', arg1)  # the _files folder auto generated by nbconvert
    files_folder_name = re.findall(f'^{notebook_folder_name}\/([^\s]+)', files_folder)[0]
    mdfile = re.sub('.ipynb', '.md', arg1)  # markdown file name
    move_to = 'content/' + arg2  # where post is located
    static_folder = 'static/' + arg2
    target_static_folder = static_folder + '/' + files_folder_name  # the target static folder

    # delete the target static folder because there might be old and useless files
    if os.path.exists(target_static_folder):
        shutil.rmtree(target_static_folder)

    # create path if not existing
    pathlib.Path(move_to).mkdir(parents=True, exist_ok=True)
    pathlib.Path(target_static_folder).mkdir(parents=True, exist_ok=True)

    # convert to md
    os.system(f"jupyter nbconvert --to markdown {arg1}")

    # solving mathjax problems and indentation
    with open(mdfile, 'r') as f:
        txt = f.read()
    
    # Fix indentation first
    txt = fix_indentation(txt)
    
    # Fix mathjax
    txt = re.sub(r'\$([^$]*)\$', r'`$\1$`', txt)
    txt = re.sub(r'`\$\$`([^$]*)`\$\$`', r'`$$\1$$`', txt)

    # move files_folder to static folder
    if Path(files_folder).exists():
        os.system(f'cp -r {files_folder}/* {target_static_folder}')
        os.system(f'rm -rf {files_folder}')

    # Better approach - only replace in actual image links
    md_image_links_raw = re.findall(r'!\[(.*?)\]\((.*?)\)', txt)

    for alt_text, img_path in md_image_links_raw:
        if 'https://' in img_path:
            continue
        if files_folder_name not in img_path:
            try:
                image_folder_name = re.findall(r'^.+?(?=\/)', img_path)[0]
                # Only replace this specific image path, not globally
                new_path = f'/{arg2}/{files_folder_name}/{img_path.split("/", 1)[1]}'
                txt = txt.replace(f'![{alt_text}]({img_path})', f'![{alt_text}]({new_path})')
                os.system(f'cp {notebook_folder_name}/{img_path} {static_folder}/{files_folder_name}')
            except (IndexError, Exception) as e:
                print(f"Warning: Could not process image {img_path}: {e}")

    # # handle image links
    # md_image_links_raw = re.findall(r'!\[(.*?)\]\((.*?)\)', txt)
    # md_image_links = [b for (a, b) in md_image_links_raw]
    
    # for lk in md_image_links:
    #     if 'https://' in lk:
    #         continue
    #     if files_folder_name not in lk:
    #         image_folder_name = re.findall(r'^.+?(?=\/)', lk)[0]
    #         txt = re.sub(f'{image_folder_name}/', f'/{arg2}/{files_folder_name}/', txt)
    #         os.system(f'cp {notebook_folder_name}/{lk} {static_folder}/{files_folder_name}')
    
    txt = re.sub(r'\!\[png\]\(', f'![png](/{arg2}/', txt)

    # Identify and wrap collapsible code blocks
    # More flexible pattern for code-fold with various spacing options
    code_fold_pattern = r'(```python\n)#\|\s*code-fold\s*:\s*true(.*?)(```)'
    txt = re.sub(code_fold_pattern, r'{{< codeCollapse >}}\2{{< /codeCollapse >}}', txt, flags=re.DOTALL)

    # Pattern to identify content within {{< codeCollapse >}} or ```python``` blocks
    code_block_pattern = r'(\{\{< codeCollapse >\}}\n.*?\n\{\{< /codeCollapse >\}\})|(```python\n.*?\n```)'  # Matches both code collapse and python code blocks

    def remove_backticks_in_code(match):
        # Remove backticks around $...$ expressions within the matched block
        code_block = match.group(0)  # Whole matched block
        return re.sub(r'`(\$[^$]*\$)`', r'\1', code_block)

    # Apply the substitution only within matched code blocks
    txt = re.sub(code_block_pattern, remove_backticks_in_code, txt, flags=re.DOTALL)

    # Add spacing after images by adding a blank line
    txt = re.sub(r'(!\[.*?\]\(.*?\))(\n[^!\n])', r'\1\n\n\2', txt)

    # write to file
    with open(mdfile, 'w') as f:
        f.write(txt)
    
    os.system(f'mv {mdfile} {move_to}')