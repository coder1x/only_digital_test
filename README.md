# Test task from only_digital

## Demo page:
[start page on the server](https://frontendx.ru/public/only_digital_test/) `https://frontendx.ru/public/only_digital_test/`

## Version Node  

* Node version v18.12.1

#### Installing dependencies
```commandline
npm i
```

#### Development Mode
```commandline
npm start
```
works for: `http://localhost:8080/`


#### Production build
```commandline
npm run build
```

## Notes on pixelperfect

* In the layout of the spinner points are not at equal distances, so there is a discrepancy with the implementation.

* In the slider (Swiper), according to the layout, the middle slide has a width of 400px and the other two have a width of 320px. For normal operation of the slider it is necessary that all the slides have the same width, so it was decided to limit them to 320px.

* On the mobile version in the video demonstration you can see how the slider has subheadings and dividing line and the design from the layout has no headers, it was decided to implement headers, because without headers the user will not know what it is a slide.
