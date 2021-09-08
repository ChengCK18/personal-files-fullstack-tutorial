(this["webpackJsonpex3-9-to-ex3-11-frontend"]=this["webpackJsonpex3-9-to-ex3-11-frontend"]||[]).push([[0],{40:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t.n(c),o=t(16),r=t.n(o),u=(t(7),t(6)),i=t(3),l=t(0),s=function(e){var n=e.newSearchNameVal,t=e.newSearchName;return Object(l.jsxs)("div",{children:["Filter shown with ",Object(l.jsx)("input",{onChange:n,value:t})]})},d=function(e){var n=e.onSubmit,t=e.newNameVal,c=e.newName,a=e.newNumberVal,o=e.newNum;return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:n,children:[Object(l.jsxs)("div",{children:["Name: ",Object(l.jsx)("input",{onChange:t,value:c})]}),Object(l.jsxs)("div",{children:["Number: ",Object(l.jsx)("input",{onChange:a,value:o})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"add"})})]})})},b=function(e){var n=e.name,t=e.number,c=e.buttonId,a=e.handleDeleteContact;return Object(l.jsxs)("div",{children:[n," \u27a1 ",t," ",Object(l.jsx)("button",{id:c,onClick:a,children:"delete"})]})},j=function(e){var n=e.message;return null===n?null:"Error"===n.substring(0,5)?Object(l.jsx)("div",{className:"error",children:n}):Object(l.jsx)("div",{className:"success",children:n})},f=t(4),h=t.n(f),m="http://localhost:3001/api/persons",O={getAllContact:function(){return h.a.get(m).then((function(e){return e.data}))},addContact:function(e){var n=h.a.post(m,e);return console.log("Adding"),console.log(e),n.then((function(e){return e.data}))},deleteContact:function(e){return h.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},updateContact:function(e){return h.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))}},v=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],o=Object(c.useState)(""),r=Object(i.a)(o,2),f=r[0],h=r[1],m=Object(c.useState)(""),v=Object(i.a)(m,2),x=v[0],p=v[1],w=Object(c.useState)(""),N=Object(i.a)(w,2),g=N[0],C=N[1],S=Object(c.useState)(null),k=Object(i.a)(S,2),y=k[0],V=k[1];Object(c.useEffect)((function(){O.getAllContact().then((function(e){a(e)}))}),[]);var A=new RegExp(g,"i"),E=""===g?t:t.filter((function(e){return e.name.match(A)}));return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Phonebook \u260e\ud83d\udcd6"}),Object(l.jsx)(j,{message:y}),Object(l.jsx)(s,{newSearchNameVal:function(e){C(e.target.value)},newSearchName:g}),Object(l.jsx)("h2",{children:"Add New Contact in PhoneBook \ud83d\udcd6"}),Object(l.jsx)(d,{onSubmit:function(e){e.preventDefault();if(t.some((function(e){return e.name===f}))){if(window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===f})),c=Object(u.a)(Object(u.a)({},n),{},{phoneNumber:x});O.updateContact(c).then((function(e){a(t.map((function(n){return n.name!==e.name?n:c}))),V("Contact successfully updated"),setTimeout((function(){V(null)}),5e3)})).catch((function(e){V("Error: Information of ".concat(f," has already been removed from server")),setTimeout((function(){V(null)}),5e3)}))}}else if(""===x)alert("Please give ".concat(f," a phone number :)"));else{var o={name:f,phoneNumber:x};console.log(o),O.addContact(o).then((function(e){V("".concat(e.name,"'s contact added successfully")),setTimeout((function(){V(null)}),5e3),O.getAllContact().then((function(e){a(e)}))})),h(""),p("")}},newNameVal:function(e){h(e.target.value)},newName:f,newNumberVal:function(e){p(e.target.value)},newNum:x}),Object(l.jsx)("h2",{children:"Numbers \u260e"}),Object(l.jsx)("ul",{children:E.map((function(e){return Object(l.jsx)("li",{children:Object(l.jsx)(b,{name:e.name,number:e.phoneNumber,buttonId:e.id,handleDeleteContact:function(){return function(e){window.confirm("Remove ".concat(e.name," from list of contacts?"))&&O.deleteContact(e.id).then((function(){a(t.filter((function(n){return n.id!==e.id})))})).catch((function(n){alert("This contact has been deleted from server"),a(t.filter((function(n){return n.id!==e.id})))}))}(e)}})},e.id)}))})]})};r.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(v,{})}),document.getElementById("root"))},7:function(e,n,t){}},[[40,1,2]]]);
//# sourceMappingURL=main.c3751f2d.chunk.js.map