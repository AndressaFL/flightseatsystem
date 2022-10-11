import "./Chat.css";
function Chat() {
  //JSX como o react le e tranforma elementos no DOM
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="box box-primary direct-chat direct-chat-primary">
              <div className="box-header with-border">
                <h3 className="box-title">Direct Chat</h3>
              </div>
             <div className="box-body">
                <div className="direct-chat-messages">
                  <div className="direct-chat-msg">
                    <div className="direct-chat-info clearfix">
                      <span className="direct-chat-name pull-left">
                        Alexander Pierce
                      </span>
                      <span className="direct-chat-timestamp pull-right">
                        <br/>23 Jan 2:00 pm
                      </span>
                    </div>
                    <div className="direct-chat-text">
                      Is this template really for free? That's unbelievable!
                    </div>
                  </div>
                 <div className="direct-chat-msg right">
                    <div className="direct-chat-info-right clearfix">
                      <span className="direct-chat-name pull-right">
                        Sarah Bullock 
                      </span>
                      <span className="direct-chat-timestamp pull-right">
                        <br/>23 Jan 2:05 pm
                      </span>
                    </div>
                   {/*  <img
                      className="direct-chat-img"
                      src="https://bootdey.com/img/Content/user_2.jpg"
                      alt="Message User Image"
                    /> */}
                    <div className="direct-chat-text">
                      You better believe it!
                    </div>
                  </div>
                </div>
                  <div className="direct-chat-contacts">
                  <ul className="contacts-list">
                    <li>
                      <a href="#">
                        <img
                          className="contacts-list-img"
                          src="https://bootdey.com/img/Content/user_1.jpg"
                        />
                          <div className="contacts-list-info">
                          <span className="contacts-list-name">
                            Count Dracula
                            <small className="contacts-list-date pull-right">
                              2/28/2015
                            </small>
                          </span>
                          <span className="contacts-list-msg">
                            How have you been? I was...
                          </span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
                <div className="box-footer">
                <form action="#" method="post">
                  <div className="input-group">
                    <input
                      type="text"
                      name="message"
                      placeholder="Type Message ..."
                      className="form-control"
                    />
                    <span className="input-group-btn">
                      <button
                        type="submit"
                        className="btn btn-primary btn-flat px-4 me-sm-3"
                      >
                        Send
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary btn-flat px-4"
                      >
                        Sair
                      </button>
                      </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Chat;
