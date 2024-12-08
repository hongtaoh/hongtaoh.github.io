``` python
import os
import re
import pathlib
import os.path
```

``` python
arg1 = 'notebooks/2022-08-22-correlation.ipynb'
arg2 = 'en/blog'
assert os.path.exists(arg1), f'The file of {arg1} does not exist'
```

``` python
# where the post will finally be located
move_to = 'content/' + arg2
static_folder = 'static/' + arg2
mdfile = re.sub('.ipynb', '.md', arg1)
mdfile
static_folder
```

``` python
notebook_folder_name = re.findall(r'^.+?(?=\/)', arg1)[0]
notebook_folder_name
```

    'notebooks'

``` python
files_folder = re.sub('.ipynb', '_files', arg1)
files_folder
```

    'notebooks/2022-08-22-correlation-copy_files'

``` python
# https://stackoverflow.com/a/18710430
files_folder_name = re.findall(f'^{notebook_folder_name}\/([^\s]+)', files_folder)[0]
files_folder_name
```

    '2022-08-22-correlation-copy_files'

``` python
target_static_folder = static_folder + '/' + files_folder_name
target_static_folder
```

    'static/en/blog/2022-08-22-correlation-copy_files'

``` python
# create path if not existing
pathlib.Path(move_to).mkdir(parents=True, exist_ok=True) 
pathlib.Path(target_static_folder).mkdir(parents=True, exist_ok=True) 
```

``` python
# convert to md
os.system(f"jupyter nbconvert --to markdown {arg1}")
```

    [NbConvertApp] Converting notebook notebooks/2022-08-22-correlation-copy.ipynb to markdown
    [NbConvertApp] Support files will be in 2022-08-22-correlation-copy_files/
    [NbConvertApp] Making directory notebooks/2022-08-22-correlation-copy_files
    [NbConvertApp] Making directory notebooks/2022-08-22-correlation-copy_files
    [NbConvertApp] Making directory notebooks/2022-08-22-correlation-copy_files
    [NbConvertApp] Writing 12142 bytes to notebooks/2022-08-22-correlation-copy.md

    0

``` python
# solving mathjax problems
f = open(mdfile, 'r')
txt = f.read()
txt = re.sub(r'\$([^$]*)\$', r'`$\1$`', txt)

txt = re.sub(r'`\$\$`([^$]*)`\$\$`', r'`$$\1$$`', txt)
```

``` python
# move files_folder to static folder
os.system(f'cp -r {files_folder}/* {target_static_folder}')
os.system(f'rm -rf {files_folder}')
```

    0

``` python
# https://stackoverflow.com/a/43828391
md_image_links_raw = re.findall(r'!\[(.*?)\]\((.*?)\)', txt)
md_image_links = [b for (a,b) in md_image_links_raw]
md_image_links
```

    ['2022-08-22-correlation-copy_files/2022-08-22-correlation-copy_4_1.png',
     '2022-08-22-correlation-copy_files/2022-08-22-correlation-copy_8_1.png',
     '2022-08-22-correlation-copy_files/2022-08-22-correlation-copy_9_1.png',
     'img/corr-a-b.png']

``` python
for lk in md_image_links:
    if files_folder_name not in lk:
        image_folder_name = re.findall(r'^.+?(?=\/)', lk)[0]
        txt = re.sub(f'{image_folder_name}/', f'/{arg2}/{files_folder_name}/', txt)
        os.system(f'cp {notebook_folder_name}/{lk} {static_folder}/{files_folder_name}')      
```

    img/corr-a-b.png

``` python
txt = re.sub(r'\!\[png\]\(', f'![png](/{arg2}/', txt)
```

``` python
# move md file to en/blog
with open(mdfile, 'w') as f:
    f.write(txt)
os.system(f'mv {mdfile} {move_to}')
```

    0
