import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const EditProfile = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button className="ml-auto d-block" onClick={toggle}>Edit profile</Button>
            <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <p class="modal-title font-weight-bold" style="font-size: 1.4rem;" id="staticBackdropLabel">
                                Edit profile info</p>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalBody>
                            {/* <ModalBody className="text-center"> */}
                            <p class="font-profile-head">Username</p>
                            <input type="text" class="form-control" placeholder="Username" />

                            <p class="font-profile-head">First name</p>
                            <input type="text" class="form-control" placeholder="Name" />

                            <p class="font-profile-head">Last name</p>
                            <input type="text" class="form-control" placeholder="Surname" />

                            <p class="font-profile-head">Date of Birth</p>
                            <input type="date" class="form-control" />

                            <p class="font-profile-head">Biography</p>
                            <textarea class="form-control" aria-label="With textarea">About me...</textarea>

                            <p class="font-profile-head">Sex</p>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptionsSex"
                                    id="inlineRadio1" value="option1" />
                                <label class="form-check-label" for="inlineRadio1">male</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptionsSex"
                                    id="inlineRadio2" value="option2" />
                                <label class="form-check-label" for="inlineRadio2">female</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptionsSex"
                                    id="inlineRadio3" value="option3" />
                                <label class="form-check-label" for="inlineRadio3">prefer not to say</label>
                            </div>

                            <p class="font-profile-head">Sexual preferences</p>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptionsPreferences"
                                    id="inlineRadio4" value="option4" />
                                <label class="form-check-label" for="inlineRadio4">bi</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptionsPreferences"
                                    id="inlineRadio5" value="option5" />
                                <label class="form-check-label" for="inlineRadio5">hetero</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptionsPreferences"
                                    id="inlineRadio6" value="option6" />
                                <label class="form-check-label" for="inlineRadio6">homo</label>
                            </div>

                            <p class="font-profile-head">Current password</p>
                            <input type="text" class="form-control" placeholder="Current password" />

                            <p class="font-profile-head">New password</p>
                            <input type="text" class="form-control" placeholder="New password" />
                        </ModalBody>
                        <ModalFooter>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success">Save</button>
                        </ModalFooter>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;