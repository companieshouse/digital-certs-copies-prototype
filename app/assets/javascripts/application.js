/* global $ */


/* Document selection funcationality */

var selectedDocuments = 0;
var userSelections = [];
// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}



$(document).ready(function () {
  window.GOVUKFrontend.initAll()
  

$('.document-type').hide()


$("input[name='accounts']").on('change', function () {
  if ($(this).prop('checked') === false) {
      userSelections = jQuery.grep(userSelections, function(value) {
        return value != 'AA';
      });
  } else {
    userSelections.push('AA');
  }
  refreshFilters();
})

$("input[name='capital']").on('change', function () {
  if ($(this).prop('checked') === false) {
      userSelections = jQuery.grep(userSelections, function(value) {
        return (value != 'SH19' && value != 'CERT15' && value != 'OC138' && value != 'PROSP');
      });
  } else {
    userSelections.push('SH19');
    userSelections.push('CERT15');
    userSelections.push('OC138');
    userSelections.push('PROSP');
  }
  refreshFilters();
})

$("input[name='charges']").on('change', function () {
  if ($(this).prop('checked') === false) {
      userSelections = jQuery.grep(userSelections, function(value) {
        return (value != 'MG04' && value != 'MR04' && value != '403a' && value != '395' && value != '397');
      });
  } else {
    userSelections.push('MG04');
    userSelections.push('MR04');
    userSelections.push('403a');
    userSelections.push('395');
    userSelections.push('397');
  }
  refreshFilters();
})

$("input[name='confirmation-statements-annual-return']").on('change', function () {
  if ($(this).prop('checked') === false) {
      userSelections = jQuery.grep(userSelections, function(value) {
        return (value != 'CS01' && value != 'AR01' && value != '363s' && value != '363a' && value != '363' && value != '363x');
      });
  } else {
    userSelections.push('CS01');
    userSelections.push('AR01');
    userSelections.push('363s');
    userSelections.push('363a');
    userSelections.push('363');
    userSelections.push('363x');
  }
  refreshFilters();
})

$("input[name='incorporation']").on('change', function () {
  if ($(this).prop('checked') === false) {
      userSelections = jQuery.grep(userSelections, function(value) {
        return (value != 'MEM/ARTS' && value != 'NEWINC');
      });
  } else {
    userSelections.push('MEM/ARTS');
    userSelections.push('NEWINC');
  }
  refreshFilters();
})

$("input[name='officers']").on('change', function () {
  if ($(this).prop('checked') === false) {
      userSelections = jQuery.grep(userSelections, function(value) {
        return (value != 'AP01' && value != 'TM01' && value != 'TM02' && value != 'AP03' && value != 'CH01');
      });
  } else {
    userSelections.push('AP01');
    userSelections.push('TM01');
    userSelections.push('TM02');
    userSelections.push('AP03');
    userSelections.push('CH01');
  }
  refreshFilters();
})


$("input[name='documentType']").on('change', function () {
    if ($(this).prop('checked') === false) {
      $('.document-type').hide()
    } else {
      $('.document-type').show()
    }
  })

})

$("input[name='rowCheckBox']").on('change', function () {
  if ($(this).prop('checked') === false) {
      selectedDocuments--;
      var newText = "";
      if(selectedDocuments == 0){
        newText = "No documents selected"
      }
      else if(selectedDocuments == 1){
        newText = "1 document selected"
      }
      else if(selectedDocuments > 1){
        newText = selectedDocuments + " documents selected"
      }
      var element = $(this).closest('tr').index();
      $("#ul"+ element).remove();

    } else {
      selectedDocuments++;
      if(selectedDocuments == 1){
        newText = "1 document selected"
      }
      else if(selectedDocuments > 1){
        newText = selectedDocuments + " documents selected"
      }
      var element = $(this).closest('tr').index();
      var description = $(this).closest('td').nextAll().last().prev().text();
      $("#documentsSelectedList").append("<li id='ul" + element + "'>" + description + "</li>");
  }
  var input = document.getElementById('hiddenInput');
  input.value = selectedDocuments.toString();
  $("#documentsSelectedCountTop").text(newText);
  $("#documentsSelectedCountBottom").text(newText);
})


function refreshFilters() {
  $('tr td:nth-child(3)').each(function (index, element) {
      if(userSelections.includes($(this).text().trim()) || userSelections.length==0){
        $(this).closest('tr').show();
      }
      else{
        $(this).closest('tr').hide();
      }
  });
}
