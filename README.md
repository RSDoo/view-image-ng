# view-image-ng

View your image in full screen with zoom & swipe.  
For angular9+ project

[![preview](https://s7.gifyu.com/images/imageView_video.gif)](https://gifyu.com/image/cZvQ)

# How to use

Install package

```
npm i view-image-ng
```

Import package to your module

```typescript
import { ViewImageModule } from 'view-image-ng';
@NgModule({
  ...
  imports: [..., ViewImageModule],
  ...
})
```

Use component

```html
<view-images [images]="[{src: 'your image url'}]"
  ><view-images></view-images
></view-images>
```

# Params

- images: array of images with src a url
- index: index of starting image. Default 0

# Events

- (dismiss): triggered if image pushed away
- (click): triggered if next to the picture is clicked for a backdrop
