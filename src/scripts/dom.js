﻿/**
 * @fileoverview
 * Helper function prototypes related to DOM objects and the DOM 
 * <strong>fixme: Christian should document the template syntax</strong>
 * templating system.
 *
 */

Element.prototype.___add=Document.prototype.___add=function()
{
  if(arguments.length)
  {
    if(arguments[0])
    {
      var doc=this.nodeType==9?this:this.ownerDocument;
      var i=0, ele=(typeof arguments[0])=='string'?doc.createElement(arguments[i++]):this; 
      var prop='', is_array=false, arg=arguments[i];
      while((is_array=arg instanceof  Array) ||
       (((typeof arg=='string') || (typeof arg=='number')) && (((arguments.length-i)%2)|| arguments[i+1] instanceof  Array ))
      )
      {
        if(is_array) 
        {
          ele.___add.apply(ele, arg); 
        }
        else if(arg) 
        {
          ele.appendChild(doc.createTextNode(arg));
        }
        arg=arguments[++i];
      }
      for( ;arguments[i] ; i+=2)
      {
        if(/string/.test(typeof arguments[i+1]))
        {
          ele.setAttribute(arguments[i], arguments[i+1]);
        }
        else
        {
          ele[arguments[i]]=arguments[i+1];
        }
      }
      if(this.nodeType==1 && (this!=ele))
      {
        this.appendChild(ele);
      }
      return ele;
    }
    else
    {
      return this.appendChild(doc.createTextNode(arguments[1]));
    }
  }
  return null;
}

Element.prototype.___add_inner = Document.prototype.___add_inner = function()
{
  if(arguments.length)
  {
    if(arguments[0])
    {
      var i=1; 
      var prop='', is_array=false, arg=arguments[i];
      var head = "<" + arguments[0];
      var content = '';
      var attrs = ' ';
      while((is_array=arg instanceof  Array) ||
       (((typeof arg=='string') || (typeof arg=='number')) && (((arguments.length-i)%2)|| arguments[i+1] instanceof  Array ))
      )
      {
        if(is_array) 
        {
          content += Element.prototype.___add_inner.apply(null, arg); 
        }
        else if(arg) 
        {
          content += arg.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        arg=arguments[++i];
      }
      for( ;arguments[i] ; i+=2)
      {
        attrs += arguments[i] + "=\u0022" + arguments[i+1] + "\u0022";
      }
      head += attrs + ">" + content + "</" + arguments[0] +">";
      if(this && this.nodeType == 1 )
      {
        this.innerHTML += head;
      }
      return head;
    }
  }
  return '';
}

/**
 * Render template into the body of the element, keeping the existing condent
 */
Element.prototype.render=Document.prototype.render=function(template)
{
  return this.___add.apply(this, template);
}

Element.prototype.renderInner = Document.prototype.renderInner = function(template)
{
  return this.___add_inner.apply(this, template);
}


/**
 * Clear the element and render the template into it
 */
Element.prototype.clearAndRender=function(template)
{
  this.innerHTML='';
  return this.___add.apply(this, template);
}

/**
 * Add the css class "name" to the element's list of classes
 * fixme: Does not work with dashes in the name!
 */
Element.prototype.addClass=function(name)
{
  if(!(new RegExp('\\b'+name+'\\b')).test(this.className))
  {
    this.className=(this.className?this.className+' ':'')+name;
  }
  return this;
}

/**
 * Remove the css class "name" from the elements list of classes
 */
Element.prototype.removeClass=function(name)
{
  var re=new RegExp(name+' ?| ?'+name);
  if(re.test(this.className)) 
  {
    this.className=this.className.replace(re, '');
  }
  return this;
}

/**
 * Check if the element has the class "name" set
 */
Element.prototype.hasClass=function(name)
{
  return (new RegExp('(?:^| +)'+name+'(?: +|$)')).test(this.className)
}

/**
 * Returns the next sibling of the element that is an element. Ignores
 * nodes that are not elements
 */
Element.prototype.getNextSiblingElement = function()
{
  var next = this.nextSibling;
  while( next && next.nodeType != 1 )
  {
    next = next.nextSibling;
  }
  return next;
}

Element.prototype.getTop = function()
{
  var c = this, o_p = null, top = c.offsetTop;
  while( o_p = c.offsetParent )
  {
    top += o_p.offsetTop;
    c = o_p;
  }
  return top;
}

/**
 * Insert target after node in the tree.
 */
Element.prototype.insertAfter = function(node, target)
{
  var nextElement = target.nextSibling;
  while( nextElement && nextElement.nodeType != 1 )
  {
    nextElement = nextElement.nextSibling;
  }
  if( nextElement )
  {
    this.insertBefore(node, nextElement);
  }
  else
  {
    this.appendChild(node);
  }
}

/**
 * Returns an array of all children on the element that are also elements
 */
Element.prototype.getChildElements = function()
{
  var children = this.childNodes, ret = [], c = null, i=0;
  for( ; c = children[i]; i++)
  {
    if(c.nodeType == 1) 
    {
      ret[ret.length] = c;
    }
  }
  return ret;
}

/**
 * Dispatches an event on the element with the name "name" and and properties
 * that are set in the "custom_props" object
 */
Element.prototype.releaseEvent =  function(name, custom_props)
{
  var event=document.createEvent('Events'), prop = '';
  event.initEvent(name, true, true);
  if( custom_props )
  {
    for( prop in custom_props )
    {
      event[prop] = custom_props[prop];
    }
  }
  this.dispatchEvent(event);
}

/* currently broken in Opera */
Element.prototype.getWidth=function(e)
{
  var style = window.getComputedStyle(this, null);
  return this.offsetWidth 
    - parseInt(style['paddingLeft'])
    - parseInt(style['paddingRight'])
    - parseInt(style['borderLeftWidth'])
    - parseInt(style['borderRightWidth']);
}

Element.prototype.spliceInnerHTML = function(str)
{
  this.insertAdjacentHTML('afterEnd', str);
  /*
  var
  temp = this.ownerDocument.createElement('div-parser'),
  range = this.ownerDocument.createRange();
  temp.innerHTML = str;
  if(this.nextSibling)
  {
    range.selectNodeContents(this.parentNode.insertBefore(temp, this.nextSibling));
  }
  else
  {
    range.selectNodeContents(this.parentNode.appendChild(temp));
  }
  this.parentNode.replaceChild(range.extractContents(), temp);
  */
}

/**
 * Get the first contained element with name nodeName
 */
Element.prototype.getFirst = function(nodeName)
{
  return this.getElementsByTagName(nodeName)[0];
}

/**
 * Get the last contained element with name nodeName
 */
Element.prototype.getLast = function(nodeName)
{
  var all = this.getElementsByTagName(nodeName);
  return all[all.length - 1];
}

/**
 * Get the previous element of the same name as "current" that is a
 * child of the element. Return null if there is no such element.
 */
Element.prototype.getPreviousSameNamed = function(current)
{
  var 
  nodeName = current && current.nodeName,
  all = this.getElementsByTagName(nodeName), 
  cur = null, 
  i = 0;

  for( ; ( cur = all[i] ) && cur != current; i++);
  return cur && all[i-1] || null;
  
}

/**
 * Same as getPreviousSameNamed but finds the next element
 */
Element.prototype.getNextSameNamed = function(current)
{
  var 
  nodeName = current && current.nodeName,
  all = this.getElementsByTagName(nodeName), 
  cur = null, 
  i = 0;

  for( ; ( cur = all[i] ) && cur != current; i++);
  return cur && all[i+1] || null;
}

/**
 * Get the next element of the same name as "target" that is a
 * sibling of the element. Return null if there is no such element.
 */
Element.prototype.getNextSameNamedSibling = function(target)
{
  var 
  next = this.nextSibling,
  name = this.nodeName;

  while( next && next.nodeName != name )
  {
    next = next.nextSibling;
  }
  
  return next;
}

/**
 * Same as getNextSameNamedSibling but finds previous sibling
 */
Element.prototype.getPreviousSameNamedSibling = function(target)
{
  var 
  previous = this.previousSibling,
  name = this.nodeName;

  while( previous && previous.nodeName != name )
  {
    previous = previous.previousSibling;
  }
  
  return previous;
}

/**
 * Returns the next element for which the function "filter" returns true.
 * The filter functions is passed two arguments, the current candidate element
 * and the element on which the method was called
 */
Element.prototype.getNextWithFilter = function(root_context, filter)
{
  var cursor = this;
  while(( cursor = cursor.getNextInFlow(root_context) ) && !filter(cursor, this) );
  return cursor; 
}

/**
 * Same as getNextWithFilter but finds previous element
 */
Element.prototype.getPreviousWithFilter = function(root_context, filter)
{
  var cursor = this;
  while( ( cursor = cursor.getPreviousInFlow(root_context) ) && !filter(cursor, this) );
  return cursor; 
}

Element.prototype.getNextInFlow = function(root_context)
{
  var
  next = this.firstElementChild || this.nextElementSibling,
  cursor = this;

  while(!next && ( cursor = cursor.parentNode ) && cursor != root_context  )
  {
    next = cursor.nextElementSibling;
  }
  return next;
}

Element.prototype.getPreviousInFlow = function(root_context)
{
  var 
  previous = this.previousElementSibling, 
  parent = this.parentNode,
  cursor = previous;

  while( cursor && cursor.lastElementChild && ( cursor = cursor.lastElementChild ) );
  return cursor || previous || parent != root_context && parent || null;
}

Element.prototype.scrollSoftIntoView = function()
{
  // just checking the first offsetParent to keep it simple
  var scrollContainer = this.offsetParent;
  var min_top = 20;
  if( scrollContainer && scrollContainer.offsetHeight < scrollContainer.scrollHeight )
  {
    if( this.offsetTop < scrollContainer.scrollTop + min_top )
    {
      scrollContainer.scrollTop = this.offsetTop - min_top;
    }
    else if( this.offsetTop + this.offsetHeight > scrollContainer.scrollTop + scrollContainer.offsetHeight - min_top )
    {
      scrollContainer.scrollTop = 
        this.offsetTop + this.offsetHeight - scrollContainer.offsetHeight + min_top;
    }
  }
}

/**
 * Get the text content of the first node in Node with the name nodeName
 * Escapes opening angle brackets into less than entities. If node is not
 * found, returns null
 * @argument nodeName {string} node name
 * @returns {Element}
 */
Node.prototype.getNodeData=function(nodeName)
{
  var node=this.getElementsByTagName(nodeName)[0];
  if(node)
  {
    return node.textContent.replace(/</g, '&lt;');
  }
  return null;
}

/**
 * Get the value of an attribute called attr from the first child node called
 * nodeName. If node is not found, returns null
 * @argument nodeName {string} node name
 * @argument attr {string} attribute name
 * @returns {string}
 */
Node.prototype.getAttributeFromNode=function(nodeName, attr)
{
  var node=this.getElementsByTagName(nodeName)[0];
  if(node)
  {
    return node.getAttribute(attr);
  }
  return null;
};

/**
 * Returns the index of item in the nodelist
 * (The same behaviour as js1.6 array.indexOf)
 * @argument item {Element}
 */
NodeList.prototype.indexOf = function(item)
{
  for( var cursor = null, i = 0; cursor = this[i]; i++)
  {
    if( cursor == item )
    {
      return i;
    }
  }
  return -1;
}

StyleSheetList.prototype.getDeclaration = function(selector)
{
  var sheet = null, i = 0, j = 0, rules = null, rule = null;
  for( ; sheet = this[i]; i++ )
  {
    rules = sheet.cssRules;
    // does not take into account import rules
    for( j = 0; ( rule = rules[j] ) && !( rule.type == 1 && rule.selectorText == selector ); j++);
    if( rule )
    {
      return rule.style;
    }
  }
  return null;
};

StyleSheetList.prototype.getPropertyValue = function(selector, property)
{
  var style = this.getDeclaration(selector);
  return style && style.getPropertyValue(property) || '';
};

/**
 * Make sure there is a getElementsByClassName method if there is no native
 * implementation of it
 * @deprecated All verison of opera in which the dragonfly client runs should have this by now
 */
(function(){
  if( !document.getElementsByClassName )
  {
    Document.prototype.getElementsByClassName=Element.prototype.getElementsByClassName=function()
    {
      var eles = this.getElementsByTagName("*"), 
        ele = null, ret =[], c_n = '', cursor = null, i = 0, j = 0;
      for( ; c_n = arguments[i]; i++) 
      {
        arguments[i] = new RegExp('(?:^| +)' + c_n + '(?: +|$)');
      }
      for (i=0; ele=eles[i]; i++)
      { 
        c_n = ele.className;
        for ( j=0; ( cursor = arguments[j] ) && cursor.test(c_n); j++);
        if( !cursor )
        {
          ret[ret.length] = ele;
        }
      }
      return ret;
    } 
  }
})();

