import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { orgdata } from '../constants/Organization.js';
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";

function OrgPage() {
  const { id } = useParams(); // Get the ID from URL
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to get data from navigation state first, fallback to finding by index
  const organization = location.state?.organization || 
                      orgdata[parseInt(id) - 1]; // Convert to 0-based index

  if (!organization) {
    return (
      <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
        <SpaceBetween size="m">
          <h2>Organization not found</h2>
          <Button onClick={() => navigate('/table')}>Back to Table</Button>
        </SpaceBetween>
      </Box>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Header
        variant="h1"
        actions={
          <Button onClick={() => navigate('/table')}>
            Back to Table
          </Button>
        }
      >
        {organization.name}
      </Header>
      
      <SpaceBetween size="l">
        <Box>
          <SpaceBetween size="s">
            <div>
              <strong>Description:</strong>
              <p style={{ marginTop: '5px', color: '#5f6b7a' }}>{organization.description}</p>
            </div>
            
            <div>
              <strong>Email:</strong>
              <p style={{ marginTop: '5px', color: '#5f6b7a' }}>{organization.email}</p>
            </div>
            
            <div>
              <strong>Website:</strong>
              <p style={{ marginTop: '5px' }}>
                <a 
                  href={organization.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#0073bb', textDecoration: 'none' }}
                >
                  {organization.website_url}
                </a>
              </p>
            </div>
            
            <div>
              <strong>Location:</strong>
              <p style={{ marginTop: '5px', color: '#5f6b7a' }}>{organization.locations}</p>
            </div>
            
            <div>
              <strong>Categories:</strong>
              <p style={{ marginTop: '5px', color: '#5f6b7a' }}>{organization.tags?.join(', ')}</p>
            </div>
          </SpaceBetween>
        </Box>
      </SpaceBetween>
    </div>
  );
}

export default OrgPage
