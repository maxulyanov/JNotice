# JNotice
==============
javascript notification in the browser


##Getting started
1. `npm install jnotice` your project or download arhive
2. Include JNotice.js, JNotice.css and JNotice-animate.css
3. Create instance JNotice with your options
4. Add the object to the notification
5. Call JNotice at the right time
```html
<script>
   var jnotice = new JNotice();
   jnotice.add({html: 'Hello world JNotice!', duration: 3000});
   jnotice.call();
</script>
```

##Instance options
<table>
    <tr>
      <th>Name</td>
      <th>Description</th>
      <th>Default value</th>
    </tr>
    <tr>
      <td>methodShow</td>
      <td>Show the following message after you hide the current or all at once</td>   
      <td>'default'</td>
    </tr>
    <tr>
      <td>animationShow</td>
      <td>What animation to use to show</td>   
      <td>'bounceIn'</td>
    </tr>
    <tr>
      <td>animationHide</td>
      <td>What animation to use to hide</td>   
      <td>'bounceOutLeft'</td>
    </tr>
    <tr>
      <td>position</td>
      <td>Determines the position in which a notification will be show</td>   
      <td>{x: 'left', y: 'top'}</td>
    </tr>
    <tr>
      <td>duration</td>
      <td>Duration show notification in ms</td>   
      <td>2000</td>
    </tr>
    <tr>
      <td>saveLocalStorage</td>
      <td>Synchronization instance storage with localStorage</td>   
      <td>false</td>
    </tr>
    <tr>
      <td>removeToClick</td>
      <td>To delete a notice by clicking on notice</td>   
      <td>true</td>
    </tr>
   <tr>
      <td>removeToClickAll</td>
      <td>To delete all notice by clicking on notice</td>   
      <td>false</td>
   </tr>
</table>

##Notification object options
<table>
    <tr>
      <th>Name</td>
      <th>Description</th>
    </tr>
    <tr>
      <td>html</td>
      <td>Html notification</td>   
    </tr>
    <tr>
      <td>type</td>
      <td>Type notification, there are five options: `default`, `info`, `success`, `warning`, `error`</td>   
    </tr>
    <tr>
      <td>duration</td>
      <td>Duration show current notification in ms</td>   
    </tr>
    <tr>
      <td>callbacks</td>
      <td>Object with two methods: show and hide</td>   
    </tr>
</table>

##Public methods
`add` - Add notification in storage. It may be an object or an array of objects.<br>
`call` - Call added notification<br>
`getStorage` - Get the current storage<br>
`clearStorage` - Clear the current storage<br>
`dismissAll` - Hide all shown now notification<br>
`destroy` - remove container and all notification<br>

##Events
`show` - Moment show the notification<br>
`hide` - Moment hide the notification. event.hideIsUser - will help to identify hide user or system timer

##Browsers support
Chrome, FF, Opera, Safari, IE9+

##Example
See example - <a href="http://m-ulyanov.github.io/JNotice/">JNotice</a>
