import React, { useEffect } from "react";
import { Container } from 'reactstrap';
import { socketChat } from "../util/socket";
import { pushChatMessage } from "../redux/chats/ActionCreators";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
    pushChatMessage: (msg) => dispatch(pushChatMessage(msg))
});

function Footer() {
    useEffect(() => {
        socketChat.on("chat_message", (data) => {
            pushChatMessage(data);
        });
    }, []);

    return (
        <div className="footer bg-light">
            <Container>
                <h2>footer</h2>
            </Container>
        </div>
    )
}

export default connect(mapDispatchToProps)(Footer);
