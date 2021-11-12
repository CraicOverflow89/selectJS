Select JS
=========

Dynamic select elements that fetch options from a remote API.

### Usage

Define HTML elements with a class of `selectJS` to utilise the library.

```html
<select id="users" class="selectJS" data-placeholder="Select a user..." data-url="https://jsonplaceholder.typicode.com/users"></select>
```

Specify custom fields from the API to populate the global configuration of value and text for options.

```js
window.selectJS.setFields("id", "name");
```

Specify element-specific value or text field names for different use cases;

```html
<select id="posts" class="selectJS" data-placeholder="Select a post..." data-url="https://jsonplaceholder.typicode.com/posts" data-fieldtext="title" data-fieldvalue="id"></select>
```

### Tasks

There are plenty of additional features that should be made easily accessibly without interfering with the simplicity of use.

 - ability to pass params to API via a _depends on_ attribute