from PIL import Image
import collections

img = Image.open('client/assets/images/logo-transparent.png')
img = img.convert('RGBA')

# Get colors
colors = img.getcolors(maxcolors=1000000)

# Filter out transparent or near-transparent colors
# and background (white/black) if any
valid_colors = []
for count, (r, g, b, a) in colors:
    if a > 200 and not (r>240 and g>240 and b>240) and not (r<20 and g<20 and b<20):
        valid_colors.append((count, (r,g,b)))

valid_colors.sort(key=lambda x: x[0], reverse=True)

for i in range(min(5, len(valid_colors))):
    count, (r, g, b) = valid_colors[i]
    hex_color = "#{:02x}{:02x}{:02x}".format(r, g, b)
    print(f"Color: {hex_color} - Count: {count}")
