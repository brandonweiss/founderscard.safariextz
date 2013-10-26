var FoundersCard = {}

FoundersCard.performCommand = function(event) {
  if (event.command === "founderscard") {
    var currentURL      = event.target.browserWindow.activeTab.url
    var cleanCurrentURL = FoundersCard.cleanBenefitURL(currentURL)

    var benefit = FoundersCard.findBenefitByURL(cleanCurrentURL)

    if (benefit !== undefined) {
      safari.application.activeBrowserWindow.openTab().url = benefit.url
    }
  }
}

FoundersCard.validateCommand = function(event) {
  if (event.command === "founderscard") {
    var currentURL      = event.target.browserWindow.activeTab.url
    var cleanCurrentURL = FoundersCard.cleanBenefitURL(currentURL)

    var benefit = FoundersCard.findBenefitByURL(cleanCurrentURL)

    if (benefit === undefined) {
      event.target.disabled = true
      event.target.badge    = 0
    } else {
      // var notification = new Notification("FoundersCard", { "body": "You have a FoundersCard benefit." })
      event.target.disabled = false
      event.target.badge    = 1
    }
  }
}

FoundersCard.cleanBenefitURL = function(benefitURL) {
  if      (benefitURL.substring(0, 12) == "https://www.") { return benefitURL.substring(12) }
  else if (benefitURL.substring(0, 11) == "http://www.")  { return benefitURL.substring(11) }
  else if (benefitURL.substring(0, 8)  == "https://")     { return benefitURL.substring(8) }
  else if (benefitURL.substring(0, 7)  == "http://")      { return benefitURL.substring(7) }
  else                                                    { return benefitURL }
}

FoundersCard.downloadBenefits = function() {
  var xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var benefits = JSON.parse(xhr.responseText)

      var benefitURLs = Object.keys(benefits)

      benefitURLs.forEach(function(benefitURL) {
        var newBenefitURL = FoundersCard.cleanBenefitURL(benefitURL)

        if (benefitURL !== newBenefitURL) {
          Object.defineProperty(benefits, newBenefitURL, Object.getOwnPropertyDescriptor(benefits, benefitURL))
          delete benefits[benefitURL]
        }
      })

      FoundersCard.benefits(benefits)
    }
  }

  xhr.open("GET", "https://founderscard.com/extension/benefits", true)
  xhr.send()
}

FoundersCard.periodicallyDownloadBenefits = function() {
  FoundersCard.downloadBenefits()
  setTimeout(FoundersCard.periodicallyDownloadBenefits, 10800000) // 3 hours
}

FoundersCard.findBenefitByURL = function(benefitURL) {
  return FoundersCard.benefits()[benefitURL]
}

FoundersCard.benefits = function(benefits) {
  if (benefits) {
    return FoundersCard.rawBenefits(JSON.stringify(benefits))
  } else {
    return JSON.parse(FoundersCard.rawBenefits())
  }
}

FoundersCard.rawBenefits = function(rawBenefits) {
  if (rawBenefits) {
    return localStorage["benefits"] = rawBenefits
  } else {
    return localStorage["benefits"]
  }
}

safari.application.addEventListener("command",  FoundersCard.performCommand,  false)
safari.application.addEventListener("validate", FoundersCard.validateCommand, false)

FoundersCard.periodicallyDownloadBenefits()