require 'spec_helper'

describe StaticsController do

  describe "GET 'aboutus'" do
    it "returns http success" do
      get 'aboutus'
      response.should be_success
    end
  end

  describe "GET 'game'" do
    it "returns http success" do
      get 'game'
      response.should be_success
    end
  end

end
