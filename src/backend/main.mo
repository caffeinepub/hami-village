actor {
  public query ({ caller }) func hello(name : Text) : async Text {
    "Hello, " # name # "! Welcome to Hami Village on the Internet Computer.";
  };
};
