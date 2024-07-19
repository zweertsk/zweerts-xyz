+++
title = 'Recursive Bash'
date = 2023-11-11T12:06:45+01:00
categories = ['wiki']
tags = ['bash']
draft = false
+++

Given a list of files, e.g. movies in *.mp4 format.
For each movie, make a directory with the title of that movie and move the movie file in that new directory. For file in *.mp4, check if it's a file or continue to next, make directory called like the file but without the extension and move the file into the folder with name (again without extension).

```bash
for f in *.mp4; do [ -f "$f" ] || continue; mkdir "${f%.*}" && mv "$f" "${f%.*}"; done
```

I have used the basis of this command a lot of times. Another example; to update my music catalog with the beets[^1] command. Given a folder with albums and EP's in their own folder. For directory in current directory, check if it's a directory or continue, run beet import -d for directory.

```bash
for d in .; do [ -d "$d" ] || continue; beet import -d "${f}" ; done
```
[^1]: [beets.io](https://beets.io/)
