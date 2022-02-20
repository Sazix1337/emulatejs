# EmulateJS

This is the framework can manipulate with DOM tree, mount virtual nodes and other.
For the first you should download it.<br> NPM(EmulateJS reactivity): `npm i emulatejs-reactivity`.<br>
NPM(EmulateJS VDOM): `npm i emulatejs-vdom`.
Plain JS(EmulateJS reactivity): <a href="https://sazix.7m.pl/emulatejs/set.reactivity.js" download="https://sazix.7m.pl/emulatejs/set.reactivity.js">Download</a><br>
Plain JS(EmulateJS VDOM): <a href="https://sazix.7m.pl/emulatejs/set.reactivity.js" download="https://sazix.7m.pl/emulatejs/set.vdom.js">Download</a>

**Example with reactivity:**<br>
`index.html`
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Document</title>
</head>
<body>
<div id="app"></div>
<script src="set.reactivity.js"></script>
<script src="script.js"></script>
</body>
</html>
```
`script.js`
```js
const state = reactive({
    randomNumber: 0
});

watchEffect(() => {
    console.log(`The current random number state is: ${state.randomNumber}`);
});

setInterval(() => {
    state.randomNumber = Math.floor(Math.random() * 1000);
}, 1000);
```
On this example we create a variable "***state()***" with function "***reactivity()***".
This accepts 1 parameter, this is object of different properties. Function "watchEffect" checking the changing values of all properties.
When the property value changes "***watchEffect()***" is running 1 time. This accepts only 1 parameter.
This can be callback or anonymous function.

**Example with VDOM:**<br>
`index.html`
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Document</title>
</head>
<body>
<div id="app" />
<script src="set.vdom.js"></script>
<script src="script.js"></script>
</body>
</html>
```
`script.js`
```js
const node = h('div', { class: 'container' }, [
    h('h1', { class: 'h1' }, 'Hello World')
]);
const app = document.getElementById("app");
mount(node, app);
```
***h()*** - function which create a virtual node. First parameter - tag name.
Second parameter is object with attributes.
And third parameter is depends. Tags which have text, example: p, h1, h2 and other, third parameter is string-type. Default type of depends - array with new virtual nodes.<br>
***unmout()*** - function for unmount virtual node from DOM tree of app container.
<br>
Let's do a small TODO app with VDOM.<br>
`index.html`
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Document</title>
</head>
<body>
<button onclick="secondReplace()">Replace to 1</button>
<button onclick="firstReplace()">Replace to 2</button>
<div id="app" />
<script src="set.vdom.js"></script>
<script src="script.js"></script>
</body>
</html>
```
`script.js`
```js
const fNode = h('div', { class: 'firstNode' }, [
    h('h1', {}, 'Hello')
]);

const sNode = h('div', { class: 'secondNode' }, [
    h('h1', {}, 'World')
]);

function firstReplace() {
    patch(fNode, sNode);
}

function secondReplace() {
    patch(sNode, fNode);
}

mount(fNode, document.getElementById("app"));
```

***patch()*** - Function for replace the first virtual node to second.

TODO app using VDOM and Reactivity.
<br>
`index.html`
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Document</title>
</head>
<body>
<div id="app" />
<script src="set.reactivity.js"></script>
<script src="set.vdom.js"></script>
<script src="script.js"></script>
</body>
</html>
```
`script.js`
```js
const state = reactive({
     inputValue: ''
});

function render(src) {
     return h('div', {class: 'container'}, [
          h('h1', {title: 'TODO'}, 'Todo APP using EmulateJS'),
          h('div', {class: 'text'}, [
              h('img', {
                src: src,
                style: 'width: 300px;'
              }, []),
              h('p', {}, 'Write the image link'),
              h('input', {oninput: 'state.inputValue = this.value'}, [])
          ])
     ]);
}

let currentNode;
watchEffect (() => {
    if (!currentNode) {
        currentNode = render(state.inputValue)
        mount(currentNode, document.getElementById("app"));
    } else {
        const newNode = render(state.inputValue);
        patch(currentNode, newNode);
        currentNode = newNode;
    }
})
```
