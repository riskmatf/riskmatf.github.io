import typing as ty
import argparse as argp
import sys
import os
import re
import cv2
import numpy as np
import datetime as dt
import yaml

sizes = \
        {
            'sm': 576,
            'md': 768,
            'lg': 992
        }


# TODO: image folder remove last / (separator)
# add argument for name

def main():
    arguments = parse_arguments(sys.argv[1:])

    files = filter_directory(arguments.image_folder)
    resize_images(arguments.image_folder, files)

    if arguments.date == '':
        date = dt.date.today().strftime('%Y-%m-%d')
    else:
        date = arguments.date

    name = os.path.basename(arguments.image_folder)

    write_manifest(files, name, date, arguments.output)


def parse_arguments(args: ty.List[str]) -> argp.Namespace:
    parser = argp.ArgumentParser()

    parser.add_argument('image_folder', metavar='image-folder')
    parser.add_argument('-o', '--output', default='_photos', help='file name to put data in by default date-name.md')
    parser.add_argument('-d', '--date', default='', help='Date of the gathering')

    return parser.parse_args(args)


def filter_directory(dir: str) -> ty.List[str]:
    dir_iter = iter(os.walk(dir))
    root, _, files = next(dir_iter)
    base_name = os.path.basename(root)

    files = list(filter(lambda file: re.fullmatch(f'{base_name}\\d+.jpg', file), files))

    files = list(map(lambda file: os.path.join(root, file), files))

    return files


def resize_images(root: str, images: ty.List[str]) -> None:

    for image in images:
        img: np.ndarray = cv2.imread(image)
        for name, new_width in sizes.items():
            new_height = round(new_width / (img.shape[1] / img.shape[0]))
            new_img = cv2.resize(img, dsize=(new_width, new_height), interpolation=cv2.INTER_AREA)
            cv2.imwrite(os.path.join(root, f'{name}-{os.path.basename(image)}'), new_img)


def generate_image_names(image: str)->ty.Dict[str,str]:
    image = os.path.basename(image)

    res = {}

    for size in sizes.keys():
        res[size] = f'{size}-{image}'

    return res


def write_manifest(images: ty.List[str], name: str, date: str, output_dir: str) -> None:

    images = list(map(generate_image_names, images))

    res = {}

    res['name'] = name
    res['date'] = date

    res['images'] = images

    cont = yaml.dump(res, default_flow_style=False)

    with open(os.path.join(output_dir, f'{date}-{name}.md'), 'w') as f:
        f.writelines(['---\n', cont, '---\n'])
        f.flush()


if __name__ == '__main__':
    main()
