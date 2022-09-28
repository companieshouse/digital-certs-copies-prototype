const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line



// document selection page error message and routing
router.post('/select-multiple-documents', function(req, res) {

  var errors = [];
    var noDocumentSelectedHasError = false;

    if(req.session.data['selectedDocs'] == 0){
        noDocumentSelectedHasError = true;
  }

  if(noDocumentSelectedHasError){
    res.render('select-multiple-documents', {
      errorNoDocumentSelected: noDocumentSelectedHasError
        })
  }
  else
  {
    res.redirect('docs-delivery-option')
  }

}) 


// Dispatch radio buttons routing

router.post('/docs-delivery-option', function (req, res) {

    if(req.session.data['choose-dispatch-option'] == "digital"){

      res.redirect('basket/basket-one-digital-item')
    }
    else if(req.session.data['choose-dispatch-option'] == "paper"){

      res.redirect('delivery-details')
    }
    /* else if(req.session.data['choose-dispatch-option'] == "standard"){

      res.redirect('delivery-details')
    } */
})


module.exports = router
