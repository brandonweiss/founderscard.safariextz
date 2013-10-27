should       = require("should")
domStorage   = require("dom-storage")
foundersCard = require("../founders_card")

global["localStorage"] = new domStorage()

describe "FoundersCard", ->

  describe "#removeProtocolAndOptionalSubdomain()", ->

    it "removes HTTPS and www from a URL", ->
      url = "https://www.foobar.com"
      FoundersCard.removeProtocolAndOptionalSubdomain(url).should.equal("foobar.com")

    it "removes HTTP and www from a URL", ->
      url = "http://www.foobar.com"
      FoundersCard.removeProtocolAndOptionalSubdomain(url).should.equal("foobar.com")

    it "removes HTTPS from a URL", ->
      url = "https://foobar.com"
      FoundersCard.removeProtocolAndOptionalSubdomain(url).should.equal("foobar.com")

    it "removes HTTP from a URL", ->
      url = "http://foobar.com"
      FoundersCard.removeProtocolAndOptionalSubdomain(url).should.equal("foobar.com")

    it "does nothing if theres no protocol or optional subdomain to remove", ->
      url = "foobar.com"
      FoundersCard.removeProtocolAndOptionalSubdomain(url).should.equal("foobar.com")

  describe "#getHostname()", ->

    it "extracts a hostname from a hostname and path", ->
      url = "foobar.com/bazqux"
      FoundersCard.getHostname(url).should.equal("foobar.com")

  describe "#cleanBenefitURL()", ->

    it "strips protocol, www, and extracts hostname from path", ->
      url = "http://foobar.com/bazqux"
      FoundersCard.cleanBenefitURL(url).should.equal("foobar.com")

  describe "#benefits()", ->

    it "sets benefit data in localStorage as JSON", ->
      localStorage.clear()
      FoundersCard.benefits({ "foo" : "bar" })
      localStorage["benefits"].should.equal('{"foo":"bar"}')

    it "gets benefit data from localStorage as objects", ->
      localStorage.clear()
      localStorage["benefits"] = '{"foo":"bar"}'
      FoundersCard.benefits()["foo"].should.equal("bar")

  describe "#rawBenefits()", ->

    it "sets raw data in localStorage ", ->
      localStorage.clear()
      FoundersCard.rawBenefits("foobar")
      localStorage["benefits"].should.equal("foobar")

    it "gets raw data from localStorage ", ->
      localStorage.clear()
      localStorage["benefits"] = "foobar"
      FoundersCard.rawBenefits().should.equal("foobar")
