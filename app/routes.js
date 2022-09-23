const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line




// Dispatch radio buttons routing

router.post('/docs-delivery-option', function (req, res) {

    if(req.session.data['choose-dispatch-option'] == "digital"){

      res.redirect('basket-one-digital-item')
    }
    if(req.session.data['choose-dispatch-option'] == "express"){

      res.redirect('delivery-details')
    }
    else if(req.session.data['choose-dispatch-option'] == "standard"){

      res.redirect('delivery-details')
    }
})


module.exports = router
