function OptionDataLoader(domElements) {
  this.form = domElements.form;
  this.select = domElements.select;
  this.submitButton = domElements.submitButton;
}
OptionDataLoader.prototype.init = function() {
  this.createDiv();
  this.removeSubmitButton();
  this.bindChangeToSelect();
}

OptionDataLoader.prototype.createDiv = function() {
  this.targetDiv = $("<div></div>").css("text-align", "center");
  this.form.after(this.targetDiv);
}

OptionDataLoader.prototype.removeSubmitButton = function() {
  this.submitButton.remove();
}

OptionDataLoader.prototype.bindChangeToSelect = function() {
  var _this = this;
  this.select.on("change", function() {
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

OptionDataLoader.prototype.onAjaxSuccess = function(data) {
  var weekdayData = data[this.selectedOption];
  var heading = $("<h4></h4>").text(weekdayData.title);
  this.targetDiv.text(weekdayData.text).prepend(heading).css({
    "color": weekdayData.color,
    "background-image": 'url(' + weekdayData.image + ')',
    "height": "200px"
  });
};

$(document).ready(function() {
  var form = $("#specials").find("form");
  var domElements = {
    form: form,
    select: form.find("select"),
    submitButton: form.find(".buttons")
  }

  var optionDataLoader = new OptionDataLoader(domElements);
  optionDataLoader.init();
});
