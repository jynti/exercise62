function LoadJsonForOption(domElements){
  this.form = domElements.form;
  this.select = domElements.select;
  this.submitButton = domElements.submitButton;
}
LoadJsonForOption.prototype.init = function(){
  this.createDiv();
  this.removeSubmitButton();
  this.bindChangeToSelect();
}

LoadJsonForOption.prototype.createDiv = function(){
  this.targetDiv = $("<div></div>");
  this.targetDiv.css("text-align", "center");
  this.form.after(this.targetDiv);
}

LoadJsonForOption.prototype.removeSubmitButton = function(){
  this.submitButton.remove();
}

LoadJsonForOption.prototype.bindChangeToSelect = function(){
  var _this = this;
  this.select.on("change", function(){
    _this.selectedOption = $(this).val();
    $.ajax({
      url: "data/specials.json",
      dataType: "json",
      success: _this.onAjaxSuccess,
      context: _this,
      cache: true
    });
  });
}

LoadJsonForOption.prototype.onAjaxSuccess = function(data){
  var weekdayData = data[this.selectedOption];
  this.targetDiv.text(weekdayData.text);
  var heading = $("<h4></h4>");
  heading.text(weekdayData.title);
  this.targetDiv.prepend(heading);
  this.targetDiv.css("color", weekdayData.color);

};

$(document).ready(function(){
  var form = $("#specials").find("form");
  var domElements = {
    form: form,
    select: form.find("select"),
    submitButton: form.find(".buttons")
  }

  var loadJsonForOption = new LoadJsonForOption(domElements);
  loadJsonForOption.init();
});

