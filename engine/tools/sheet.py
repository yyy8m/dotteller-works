import sys
from PIL import Image, ImageDraw
files=sys.argv[2:]; out=sys.argv[1]
cols=3; sc=2
w,h=320*sc,240*sc
rows=(len(files)+cols-1)//cols
S=Image.new('RGB',(cols*w+(cols-1)*6,rows*(h+18)),(40,40,40))
d=ImageDraw.Draw(S)
for i,f in enumerate(files):
    im=Image.open(f).convert('RGB').resize((w,h),Image.NEAREST)
    x=(i%cols)*(w+6); y=(i//cols)*(h+18)
    S.paste(im,(x,y+18)); d.text((x+4,y+3),f.split('/')[-1],fill=(255,255,0))
S.save(out)
