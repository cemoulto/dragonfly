﻿// Autogenerated by hob
window.cls || (window.cls = {});
cls.EcmascriptDebugger || (cls.EcmascriptDebugger = {});
cls.EcmascriptDebugger["6.7"] || (cls.EcmascriptDebugger["6.7"] = {});

cls.EcmascriptDebugger["6.7"].CssStyleDeclarations = function(arr)
{
  this.computedStyleList = arr[0] || [];
  this.nodeStyleList = (arr[1] || []).map(function(item)
  {
    return new cls.EcmascriptDebugger["6.7"].NodeStyle(item);
  });
};

cls.EcmascriptDebugger["6.7"].NodeStyle = function(arr)
{
  this.objectID = arr[0];
  this.elementName = arr[1];
  this.styleList = (arr[2] || []).map(function(item)
  {
    return new cls.EcmascriptDebugger["6.7"].StyleDeclaration(item);
  });
};

/**
  *
  *  Common to all origins:
  *  - indexList
  *  - valueList
  *  - priorityList
  *  - statusList
  *
  *  Common to AUTHOR and LOCAL
  *  - selector
  *  - specificity
  *
  *  For AUTHOR
  *  - stylesheetID
  *  - ruleID
  *  - ruleType
  *
  *  For SVG
  *  - specificity
  */
cls.EcmascriptDebugger["6.7"].StyleDeclaration = function(arr)
{
  // cls.EcmascriptDebugger["6.7"].StyleDeclaration.RuleOrigin
  this.origin = arr[0];
  this.indexList = arr[1] || [];
  this.valueList = arr[2] || [];
  this.priorityList = arr[3] || [];
  this.statusList = arr[4] || [];
  this.selector = arr[5];
  this.specificity = arr[6];
  this.stylesheetID = arr[7];
  this.ruleID = arr[8];
  this.ruleType = arr[9];
  /**
    *
    *  The original, stylesheet relative line number of this rule. The
    *  line number refers to the start of the declaration block.
    *
    *  This field *may* be set for STYLE rules, but as the information
    *  depends on an optional feature in Opera, some builds intended for
    *  low-memory devices may not support this.
    *
    *  @since 6.6
    */
  this.lineNumber = arr[10];
};

