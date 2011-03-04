﻿/* load after build_application.js */

window.app.builders.CookieManager || ( window.app.builders.CookieManager = {} );

/**
  * @param {Object} service the service description of the according service on the host side
  */

window.app.builders.CookieManager["1.0"] = function(service)
{
  var namespace = cls.CookieManager && cls.CookieManager["1.0"];
  var service_interface = window.services['cookie-manager'];
  if(service_interface)
  {
    new cls.CookieManager["1.0"].CookieManagerView("cookie_manager", ui_strings.M_VIEW_LABEL_COOKIES, "scroll cookie_manager", cls.CookieManager["1.0"].CookieManagerData, service.version);
    cls.CookieManager.create_ui_widgets();
  }
}

window.app.builders.CookieManager["1.1"] = function(service)
{
  var namespace = cls.CookieManager && cls.CookieManager["1.1"];
  var service_interface = window.services['cookie-manager'];
  if(service_interface)
  {
    new cls.CookieManager["1.1"].CookieManagerView("cookie_manager", ui_strings.M_VIEW_LABEL_COOKIES, "scroll cookie_manager", cls.CookieManager["1.1"].CookieManagerData, service.version);
    cls.CookieManager.create_ui_widgets();
  }
}
