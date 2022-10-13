const express = require('express')
const app = express()
const router = express.Router()

// Add your routes here 

////**** Routes for certified certificates


router.post('/certificate-details-selection', function (req, res) {

  res.redirect('certificate-registered-office-address')

})

router.post('/certificate-registered-office-address', function (req, res) {

  res.redirect('certificate-director-selection')
  
})

router.post('/certificate-registered-office-address', function (req, res) {

  res.redirect('certificate-director-selection')
  
})

router.post('/certificate-director-selection', function (req, res) {

  res.redirect('certificate-secretary-selection')
  
})

router.post('/certificate-secretary-selection', function (req, res) {

  res.redirect('certs-delivery-option')
  
})


router.post('/certs-delivery-option', function (req, res) {

  res.redirect('certificate-number-of-copies')
  
})

router.post('/certificate-number-of-copies', function (req, res) {

  res.redirect('certificate-email-copy')
  
})

router.post('/certificate-email-copy', function (req, res) {

  res.redirect('delivery-details')
  
})

// Delivery details page is used for certs and certificates journey need to add routing to check journey
router.post('/delivery-details', function(req, res) {

  var errors = [];
  var buildingStreetHasError = false;
  var townCityHasError = false;
  var postcodeHasError = false;
  var firstNameHasError = false;
  var lastNameHasError = false;
  
  if(req.session.data['first-name'] == ""){
    firstNameHasError = true;
    errors.push({text: "Enter your first name", href: "#first-name-error"});
  }
  
  if(req.session.data['last-name'] == ""){
        lastNameHasError = true;
        errors.push({text: "Enter your last name", href: "#last-name-error"});
  }

  if(req.session.data['address-line-1'] == ""){
    buildingStreetHasError = true;
    errors.push({text: "Enter a building and street", href: "#building-street-error"});
  }
  
  if(req.session.data['address-town'] == ""){
        townCityHasError = true;
        errors.push({text: "Enter a town or city", href: "#town-city-error"});
  }

  if(req.session.data['address-postcode'] == ""){
        postcodeHasError = true;
        errors.push({text: "Enter a postcode", href: "#postcode-error"});
  }

  if(buildingStreetHasError || townCityHasError || postcodeHasError){
    res.render('delivery-details', {
      errorFirstName: firstNameHasError,
          errorLastName: lastNameHasError,
          errorAddressLineOne: buildingStreetHasError,
          errorTownCity: townCityHasError,
          errorPostcode: postcodeHasError,
          errorList: errors
        })
  }
  else
  {

/* Emma - need to check if they are on the certificates or certified docs journey */

    if(app.settings.paperOption == 'standard')
    {
      res.redirect('basket/basket-two-items')
    }
    else if(app.settings.paperOption == 'express')
    {
      res.redirect('basket/basket-three-items')
    }
    
  }
})





















////**** Routes for certified documents ****


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

      res.redirect('/docs-dispatch-option')


     /* if(req.session.data['choose-paper-option'] == "standard"){
          app.set('paperOption','standard')
          res.redirect('delivery-details')
      }
      else if(req.session.data['choose-paper-option'] == "express"){
          app.set('paperOption','express')
          res.redirect('delivery-details')
      }   */   
    }

})

router.post('/docs-dispatch-option', function (req, res) {

   if(req.session.data['choose-paper-option'] == "standard"){
          app.set('paperOption','standard')
          res.redirect('delivery-details')
      }
      else if(req.session.data['choose-paper-option'] == "express"){
          app.set('paperOption','express')
          res.redirect('delivery-details')
      }      


})

router.post('/delivery-details', function (req, res) {

    if(app.settings.paperOption == 'standard')
    {
      res.redirect('basket/basket-two-items')
    }
    else if(app.settings.paperOption == 'express')
    {
      res.redirect('basket/basket-three-items')
    }
})

module.exports = router
