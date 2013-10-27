var should       = require("should")
var domStorage   = require("dom-storage")
var foundersCard = require("../founders_card")

localStorage = new domStorage();

describe("FoundersCard", function() {

  describe("#removeProtocolAndOptionalSubdomain()", function() {

    it("removes HTTPS and www from a URL", function() {
      var url = "https://www.foobar.com"
      FoundersCard.removeProtocolAndOptionalSubdomain(url).should.equal("foobar.com")
    })

    it("removes HTTP and www from a URL", function() {
      var url = "http://www.foobar.com"
      FoundersCard.removeProtocolAndOptionalSubdomain(url).should.equal("foobar.com")
    })

    it("removes HTTPS from a URL", function() {
      var url = "https://foobar.com"
      FoundersCard.removeProtocolAndOptionalSubdomain(url).should.equal("foobar.com")
    })

    it("removes HTTP from a URL", function() {
      var url = "http://foobar.com"
      FoundersCard.removeProtocolAndOptionalSubdomain(url).should.equal("foobar.com")
    })

    it("does nothing if theres no protocol or optional subdomain to remove", function() {
      var url = "foobar.com"
      FoundersCard.removeProtocolAndOptionalSubdomain(url).should.equal("foobar.com")
    })

  })

  describe("#getHostname()", function() {

    it("extracts a hostname from a hostname and path", function() {
      var url = "foobar.com/bazqux"
      FoundersCard.getHostname(url).should.equal("foobar.com")
    })

  })

  describe("#cleanBenefitURL()", function() {

    it("strips protocol, www, and extracts hostname from path", function() {
      var url = "http://foobar.com/bazqux"
      FoundersCard.cleanBenefitURL(url).should.equal("foobar.com")
    })

  })

  describe("#benefits()", function() {

    it("sets benefit data in localStorage as JSON", function() {
      localStorage.clear()
      FoundersCard.benefits({ "foo" : "bar" })
      localStorage["benefits"].should.equal('{"foo":"bar"}')
    })

    it("gets benefit data from localStorage as objects", function() {
      localStorage.clear()
      localStorage["benefits"] = '{"foo":"bar"}'
      FoundersCard.benefits()["foo"].should.equal("bar")
    })

  })

  describe("#rawBenefits()", function() {

    it("sets raw data in localStorage ", function() {
      localStorage.clear()
      FoundersCard.rawBenefits("foobar")
      localStorage["benefits"].should.equal("foobar")
    })

    it("gets raw data from localStorage ", function() {
      localStorage.clear()
      localStorage["benefits"] = "foobar"
      FoundersCard.rawBenefits().should.equal("foobar")
    })

  })

})
