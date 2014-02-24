require 'spec_helper'

describe "scores/new" do
  before(:each) do
    assign(:score, stub_model(Score,
      :points => 1,
      :user => nil
    ).as_new_record)
  end

  it "renders new score form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", scores_path, "post" do
      assert_select "input#score_points[name=?]", "score[points]"
      assert_select "input#score_user[name=?]", "score[user]"
    end
  end
end
