const express = require('express')
const app = express()
const router = express.Router()

// Add your routes here 
//certificate routes 

router.post('/order-certified-certificate', function (req, res) {

  res.redirect('sign-in')

})

router.post('sign-in', function (req, res) {

  res.redirect('certificate-delivery-option')

})

//if a user selects digital go to certificate-interrupt-card. If they select paper go to customise certificate page
router.post('/certificate-delivery-option', function (req, res) {

  if(req.session.data['cert-digital-physical'] == "digital"){

        res.redirect('certificate-interrupt-card')
       
    }
    else if(req.session.data['cert-digital-physical'] == "paper"){

      res.redirect('/certificate-details-selection')
     
    }

})

//defaults to basket with one item. If on the wool company journey it takes the user to a basket with two items.

router.post('/certificate-interrupt-card', function (req, res) {

  if(app.settings.companyname == 'woolco'){

    res.redirect('basket/basket-two-items')
    app.set('companyname','');

  }
  else
  {
     res.redirect('basket/basket-one-digital-item')
  }
 
})


//add another company take the user to the company overview screen or the search

router.post('/add-another-document-company', function (req, res) {

  if(req.session.data['company-to-order'] == "girls-day-school"){

        res.redirect('company-overview-gdst')
       
    }
    else if(req.session.data['company-to-order'] == "another-company"){

      res.redirect('search')
     
    }
  })


// certificate paper journey

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

  app.set('journey','certificates')
  app.set('paperOption','')

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

    
  }
})

//wool digital certificate routing

router.post('/order-certified-document-wool', function (req, res) {

  //set the wool journey
  app.set('companyname','woolco');
  res.redirect('certificate-delivery-option')
  
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


    if(req.session.data['docs-physical-digital'] == "digital"){

        res.redirect('interrupt-card')
       
    }
    else if(req.session.data['docs-physical-digital'] == "paper"){

      res.redirect('/docs-dispatch-option')
     
    }

})

//interrupt card routing for digital docs
router.post('/interrupt-card', function (req, res) {

  if(req.session.data['docs-physical-digital'] == "digital"){

          res.redirect('basket/basket-two-items')
      }
      else if(req.session.data['docs-physical-digital'] == "physical"){

          res.redirect('delivery-details')
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
      res.redirect('basket/basket-two-items')
    }


})

module.exports = router
