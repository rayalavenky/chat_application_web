import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useState } from "react";
import Orbitcard from "./Orbitcard";

const Contact = () => {
  const [tab, setTab] = useState<any>(0);
  const users = [
  { initials: 'AV', name: 'Aria Vex', handle: '@aria.vex', mutual: 12, online: true },
  { initials: 'KS', name: 'Kai Stratos', handle: '@kai.stratos', mutual: 8, online: true },
  { initials: 'NL', name: 'Nova Lin', handle: '@nova.lin', mutual: 24, online: false },
  { initials: 'OM', name: 'Orin Mist', handle: '@orin.mist', mutual: 3, online: false },
  { initials: 'LS', name: 'Lyra Solace', handle: '@lyra.solace', mutual: 17, online: true },
  { initials: 'ZH', name: 'Zephyr Halo', handle: '@zephyr.halo', mutual: 5, online: false },
  { initials: 'MV', name: 'Mira Vale', handle: '@mira.vale', mutual: 9, online: true },
  { initials: 'TQ', name: 'Theo Quark', handle: '@theo.quark', mutual: 14, online: false }
];

  return (
    <Box className="contact">
      <div className="contact__header">
        <div>
          <h1>Contacts</h1>
          <p>People you orbit with — 8 connections.</p>
        </div>
        <Button className="add-btn">+ Add orbiter</Button>
      </div>
      <div className="contact__controls">
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          className="custom-tabs"
        >
          <Tab label="All" />
          <Tab label="Online" />
          <Tab label="Requests" />
          <Tab label="Blocked" />
        </Tabs>

        <div>
          <TextField
            placeholder="Search by name or callsign..."
            size="small"
            variant="outlined"
            className="search-input"
          />
        </div>
      </div>
       <div className="contact__grid">
        {users.map((user, i) => (
          <Orbitcard key={i} user={user} />
        ))}
      </div>
    </Box>
  );
};

export default Contact;
