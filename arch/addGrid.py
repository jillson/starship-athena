from PIL import Image, ImageDraw, ImageFont
import sys

foo = "0123456789ABCDEF"

img = Image.open(sys.argv[1])

draw = ImageDraw.Draw(img)

w,h = img.size
gw = w / 16
gh = h / 16

fs = gw / 2
fontsize = 8
font = ImageFont.truetype("LiberationSans-Bold.ttf", fontsize)
while font.getsize("AA")[0] < fs:
    fontsize += 1
    font = ImageFont.truetype("LiberationSans-Bold.ttf", fontsize)



for i,c in enumerate(foo):
    for j,k in enumerate(foo):
        fw,fh = font.getsize(c+k)
        y = int(i * gh + (gh - fh) / 2)
        x = int(j * gw + (gw - fw) / 2)
        draw.text((x,y),c+k, font=font)

for i in xrange(len(foo)-1):
    draw.line(((i+1)*gw,0,(i+1)*gw,h))
    draw.line((0,(i+1)*gh,w,(i+1)*gh))
img.save(sys.stdout, "PNG")
