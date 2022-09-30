const express = require('express')
const app = express()
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

      if(app.set('paperOption')=="digital"){

        res.redirect('basket/basket-two-items')

      }
      else{

      app.set('paperOption','digital')
      res.redirect('basket/basket-one-digital-item')

      }
    }
    else if(req.session.data['choose-dispatch-option'] == "paper"){


      if(req.session.data['choose-paper-option'] == "standard"){
          app.set('paperOption','standard')
          res.redirect('delivery-details')
      }
      else if(req.session.data['choose-paper-option'] == "express"){
          app.set('paperOption','express')
          res.redirect('delivery-details')
      }      
    }

})

router.post('/delivery-details', function (req, res) {

    if(app.settings.paperOption == 'standard')
    {
      res.redirect('basket/basket-three-items')
    }
    else if(app.settings.paperOption == 'express')
    {
      res.redirect('basket/basket-three-items')
    }
})

module.exports = router
