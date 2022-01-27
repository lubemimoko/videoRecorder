import base64
def file_uploaded(f, name):
    file = f.split(';base64,')[1]
    filename = f"media/video/{name}"
    mp3_file = open(filename, "wb")
    decode_string = base64.b64decode(file)
    mp3_file.write(decode_string)
    return filename.replace("media/","")

