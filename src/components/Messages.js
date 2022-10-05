import React, { useEffect, useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, 
        Divider, Stack, Paper, styled, Pagination, Modal,
        TextField, Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import { getInboxMessages, getSentMessages, updateMessageStatus, sendMessage } from '../api';
import Swal from 'sweetalert2';

const Messages = ({ setTabValue, token }) => {
    
    const [selectedMessageIndex, setSelectedMessageIndex] = useState(JSON.parse(sessionStorage.getItem('selectedMessageIndex') || 0));
    const [messages, setMessages] = useState([]);

    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    const [listingId, setListingId] = useState(0);
    const [senderId, setSenderId] = useState(0);
    const [listing, setListing] = useState('');
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [content, setContent] = useState('');
    const [reply, setReply] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = async (message) => {
        setOpen(true);

        if(selectedMessageIndex === 0 && message.new === true) {
            await updateMessageStatus(token, message.id);
            const inbox = await getInboxMessages(token);
            setMessages(inbox);
        }

        setListingId(message.listingId);
        setListing(message.listing);
        setSenderId(message.senderId);
        setContent(message.content);

        if(selectedMessageIndex === 0) {
            setSender(message.sender);
        }
        else {
            setReceiver(message.receiver);
        }
    }
    const handleClose = async () => {
        setOpen(false);
        setListingId(0);
        setSenderId(0);
        setListing('');
        setReceiver('');
        setSender('');
        setContent('');
        setReply('');
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleListItemClick = async (event, index) => {
        setSelectedMessageIndex(index);
        sessionStorage.setItem('selectedMessageIndex', index);

        if(parseInt(index) === 0) {
            const inbox = await getInboxMessages(token);
            setMessages(inbox);
        }
        else {
            const sent = await getSentMessages(token);
            setMessages(sent);
        }
    };

    const handleReplyMessage = async (event) => {
        event.preventDefault();
        
        await sendMessage(token, listingId, senderId, reply);
        await handleClose();
        Swal.fire({
            icon: 'success',
            title: `Success`,
            text: `Message sent!`,
            showConfirmButton: false,
            timer: 2000
        });
    }

    const getMessages = async () => {
        if(selectedMessageIndex === 0) {
            const inbox = await getInboxMessages(token);
            setMessages(inbox);
        }
        else {
            const sent = await getSentMessages(token);
            setMessages(sent);
        }
    }

    useEffect(() => {
        setTabValue('messages');
        getMessages();
        // eslint-disable-next-line
    }, []);

    return (
        <Box sx={{display: 'flex', marginTop: '20px'}}>
            <Box sx={{ width: '30%', maxWidth: '300px', minHeight: '100vh', bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton selected={selectedMessageIndex === 0} onClick={(event) => handleListItemClick(event, 0)}
                                    sx={{display: 'flex', flexWrap: 'wrap'}}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox"/>
                    </ListItemButton>
                    <ListItemButton selected={selectedMessageIndex === 1} onClick={(event) => handleListItemClick(event, 1)}
                                    sx={{display: 'flex', flexWrap: 'wrap'}}
                    >
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sent"/>
                    </ListItemButton>
                </List>
            </Box>
            <Divider orientation="vertical" flexItem/>
            <Box sx={{ width: '70%', minHeight: '100vh', flexGrow: '1', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {messages.length ?
                    <div style={{width: '70%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Stack spacing={1} sx={{width: '100%'}}>
                            {messages[page - 1].map((message, index) => {
                                return (
                                    <Item className='message' key={index} onClick={() => handleOpen(message)} sx={{background: message.new || selectedMessageIndex === 1 ? '' : '#f2f2f2'}}>
                                        <div>
                                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                {selectedMessageIndex === 0 ? <span>From: {message.sender}</span> : <span>To: {message.receiver}</span>}
                                                {message.new && selectedMessageIndex === 0 ? <span style={{color: 'green'}}>New</span> : <></>}
                                            </div>
                                            <p>Regarding listing: {message.listing}</p>
                                        </div>
                                    </Item>
                                );
                            })}
                        </Stack>
                        <Pagination sx={{marginTop: '15px', marginBottom: '15px'}} 
                                count={messages.length}
                                page={page} color="primary" onChange={handlePageChange} 
                        />
                    </div>
                : <h2 style={{textAlign: 'center'}}>No message yet.</h2>
                }
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-message"
                aria-describedby="modal-message-content"
            >
                <Box sx={style} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{marginBottom: '40px', width: '100%'}}>
                        {selectedMessageIndex === 0 ? <p style={{color: '#737373'}}>From: {sender}</p> : <p style={{color: '#737373'}}>To: {receiver}</p>}
                        <p style={{color: '#737373'}}>Regarding listing: {listing}</p>
                        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>
                        <p>{content}</p>
                    </div>
                    {selectedMessageIndex === 0 ?
                        <form onSubmit={handleReplyMessage}  style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <TextField fullWidth id='reply-message' label='Message' variant='outlined' value={reply}
                            margin="normal" required onChange={(e) => setReply(e.target.value)}
                            />
                            <Button fullWidth id='reply-button' variant='contained' type='submit' size="large"
                                    sx={{marginTop: '10px', marginBottom: '20px'}}
                            >
                                Reply
                            </Button>
                        </form>
                    : null}
                </Box>
            </Modal>
        </Box>
    );
}

export default Messages;