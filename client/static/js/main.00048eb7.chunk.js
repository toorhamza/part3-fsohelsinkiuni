(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){e.exports=n(37)},37:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n(0),u=n.n(c),r=n(14),o=n.n(r),s=function(e){return u.a.createElement("form",{onSubmit:e.handleSubmit},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:e.newName,onChange:e.handleChange}),"phone Number: ",u.a.createElement("input",{value:e.number,onChange:e.handleChangeNumber})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add")))},l=function(e){return u.a.createElement(u.a.Fragment,null,e.filterNames.map((function(t){return u.a.createElement("h4",{key:t.name}," ",t.name," - ",t.number," - ",u.a.createElement("button",{onClick:function(){return e.delete(t.id)}},"DELETE"))})))},i=function(e){return u.a.createElement("div",null,"filter this name ",u.a.createElement("input",{onChange:e.filterName})," ")},m=n(3),f=n.n(m),d="/api/persons",h=function(){return f.a.get(d)},g=function(e){return f.a.post(d,e)},p=function(e,t){return f.a.put("".concat(d,"/").concat(e),t)},b=function(e){return f.a.delete("".concat(d,"/").concat(e))},E=(n(13),function(e){var t=u.a.createElement("div",{className:"success"},e.Message.message),n=u.a.createElement("div",{className:"error"},e.Message.message);return""!==e.Message.message?"success"===e.Message.type?t:n:null});o.a.render(u.a.createElement((function(){var e=Object(c.useState)([]),t=Object(a.a)(e,2),n=t[0],r=t[1],o=Object(c.useState)(""),m=Object(a.a)(o,2),f=m[0],d=m[1],y=Object(c.useState)(""),v=Object(a.a)(y,2),O=v[0],w=v[1],N=Object(c.useState)(n),S=Object(a.a)(N,2),j=S[0],C=S[1],k=Object(c.useState)({message:"",type:""}),T=Object(a.a)(k,2),D=T[0],M=T[1],P=function(){h().then((function(e){r(e.data),C(e.data)})).catch((function(e){M({message:"Error Occured",type:"error"}),setTimeout((function(){M({message:"",type:""})}),5e3)}))};Object(c.useEffect)(P,[]);return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(E,{Message:D}),u.a.createElement(i,{filterName:function(e){C(n.filter((function(t){return-1!==t.name.toLowerCase().indexOf(e.target.value.toLowerCase())})))}}),u.a.createElement("h2",null,"add a new user"),u.a.createElement(s,{handleSubmit:function(e){e.preventDefault();if(n.some((function(e){return e.name===f}))){window.confirm("".concat(f," is already added to phonebook. Replace the old phone number with the new one?"));var t={name:f,number:O},a=n.find((function(e){return e.name===f})).id;p(a,t).then((function(e){console.log(e),M({message:"Data Updated Successfully!",type:"success"}),setTimeout((function(){M({message:"",type:""})}),5e3)})).then((function(){return P()})).catch((function(e){return console.log(e)})),d(""),w("")}else{!function(e){g(e).then((function(e){console.log(e),M({message:"Person Added Successfully!",type:"success"}),setTimeout((function(){M({message:"",type:""})}),5e3)})).then((function(){return P()})).catch((function(e){M({message:"Error Occured!",type:"error"}),setTimeout((function(){M({message:"",type:""})}),5e3)}))}({name:f,number:O}),d(""),w("")}},newName:f,handleChange:function(e){d(e.target.value)},number:O,handleChangeNumber:function(e){w(e.target.value)}}),u.a.createElement("h2",null,"Numbers"),u.a.createElement(l,{filterNames:j,delete:function(e){window.confirm("Are You Sure You Want to Delete?")&&b(e).then((function(e){console.log(e),M({message:"Data Deleted Successfully!",type:"success"}),setTimeout((function(){M({message:"",type:""})}),5e3)})).then((function(){return P()})).catch((function(e){M({message:"Person already deleted! Please Refresh The Page",type:"error"}),setTimeout((function(){M({message:"",type:""})}),5e3)}))}}))}),null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.00048eb7.chunk.js.map