import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Sidebar() {
  const contacts = [
    {
      name: "Diogo Forlan",
      username: "@forlan77",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Jane Smith",
      username: "@jane123",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "John Doe2",
      username: "@john_doe",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "John Doe3",
      username: "@john_doe",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "John Doe4",
      username: "@john_doe",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleOpenMenu = (event, contact) => {
    setAnchorEl(event.currentTarget);
    setSelectedContact(contact);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedContact(null);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 0) {
      const results = contacts.filter(contact => 
        contact.name.toLowerCase().includes(term.toLowerCase()) || 
        contact.username.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleCloseSearchResults = () => {
    setShowSearchResults(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: "360px",
        }}
      >
        {/* Thanh tìm kiếm */}
        <Box sx={{ position: "relative" }}>
          <TextField
            placeholder="Tìm kiếm"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#808080" }} />
                </InputAdornment>
              ),
              style: {
                color: "#f5f5f5",
                backgroundColor: "#16181c",
                borderRadius: "25px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" },
              },
            }}
          />
          
          {/* Hiển thị kết quả tìm kiếm */}
          {showSearchResults && (
            <Paper
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 10,
                mt: 1,
                backgroundColor: "#16181c",
                color: "#f5f5f5",
                maxHeight: "300px",
                overflow: "auto",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <List>
                {searchResults.length > 0 ? (
                  searchResults.map((contact, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        padding: "8px 16px",
                        "&:hover": {
                          backgroundColor: "#2e2e2e",
                          borderRadius: "8px",
                          cursor: "pointer",
                        },
                      }}
                      onClick={handleCloseSearchResults}
                    >
                      <ListItemAvatar>
                        <Avatar alt={contact.name} src={contact.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={contact.name}
                        secondary={contact.username}
                        sx={{
                          "& .MuiTypography-root": {
                            color: "#f5f5f5",
                          },
                        }}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText
                      primary="Không tìm thấy kết quả"
                      sx={{
                        "& .MuiTypography-root": {
                          color: "#808080",
                          textAlign: "center",
                        },
                      }}
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          )}
        </Box>

        {/* Tạo khoảng cách 20px */}
        <Box sx={{ height: "20px" }} />

        {/* Chỉ hiển thị danh sách liên hệ khi không có kết quả tìm kiếm */}
        {!showSearchResults && (
          <Box
            sx={{
              backgroundColor: "#16181c",
              borderRadius: "25px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "16px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              marginBottom: "150px",
            }}
          >
            {/* Danh sách người liên hệ gần đây */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  color: "#f5f5f5",
                }}
              >
                Người liên hệ gần đây
              </Typography>
              <List>
                {contacts.map((contact, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      padding: "8px 0",
                      "&:hover": {
                        backgroundColor: "#2e2e2e",
                        borderRadius: "8px",
                      },
                    }}
                    secondaryAction={
                      <Tooltip title="Tùy chọn">
                        <IconButton
                          edge="end"
                          onClick={(e) => handleOpenMenu(e, contact)}
                          sx={{ color: "#aaa" }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt={contact.name} src={contact.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={contact.name}
                      secondary={contact.username}
                      sx={{
                        "& .MuiTypography-root": {
                          color: "#f5f5f5",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              {/* Menu thao tác */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>Nhắn tin</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Xem hồ sơ</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Xóa khỏi danh sách</MenuItem>
              </Menu>

              <Box sx={{ marginTop: "8px" }}>
                <Link
                  href="#"
                  sx={{
                    color: "#6ec207",
                    fontWeight: "bold",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  <Typography>Xem thêm</Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Sidebar;