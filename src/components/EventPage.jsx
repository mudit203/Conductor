import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { eventdata } from '../constants/Events.js';
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import Badge from "@cloudscape-design/components/badge";

function EventPage() {
  const { id } = useParams(); // Get the ID from URL
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to get data from navigation state first, fallback to finding by index
  const event = location.state?.event || 
                eventdata[parseInt(id) - 1]; // Convert to 0-based index

  if (!event) {
    return (
      <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
        <SpaceBetween size="m">
          <h2>Event not found</h2>
          <Button onClick={() => navigate('/table')}>Back to Table</Button>
        </SpaceBetween>
      </Box>
    );
  }

  // Format date and time
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format currency
  const formatPrice = (price, currency) => {
    if (price === 0) return 'Free';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'CA' ? 'CAD' : 'USD'
    }).format(price);
  };

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
        {event.name}
      </Header>
      
      <SpaceBetween size="l">
        <Box>
          <SpaceBetween size="s">
            <div>
              <strong>Description:</strong>
              <p style={{ marginTop: '5px', color: '#5f6b7a' }}>{event.description}</p>
            </div>
            
            <div>
              <strong>Format:</strong>
              <p style={{ marginTop: '5px' }}>
                <Badge 
                  color={
                    event.format === 'online' ? 'blue' : 
                    event.format === 'in-person' ? 'green' : 'grey'
                  }
                >
                  {event.format.charAt(0).toUpperCase() + event.format.slice(1)}
                </Badge>
              </p>
            </div>
            
            <div>
              <strong>Location:</strong>
              <p style={{ marginTop: '5px', color: '#5f6b7a' }}>{event.location}</p>
            </div>
            
            <div>
              <strong>Event Time:</strong>
              <p style={{ marginTop: '5px', color: '#5f6b7a' }}>
                <strong>Start:</strong> {formatDateTime(event.begin_time)}
                <br />
                <strong>End:</strong> {formatDateTime(event.end_time)}
              </p>
            </div>
            
            <div>
              <strong>Ticket Information:</strong>
              <p style={{ marginTop: '5px', color: '#5f6b7a' }}>
                <strong>Price:</strong> {formatPrice(event.ticket_price, event.currency)}
                <br />
                <strong>Total Tickets:</strong> {event.total_tickets_to_be_sold}
                <br />
                <strong>Free Event:</strong> {event.is_free ? 'Yes' : 'No'}
              </p>
            </div>
            
            <div>
              <strong>Access Strategy:</strong>
              <p style={{ marginTop: '5px', color: '#5f6b7a' }}>
                {event.access_strategy.charAt(0).toUpperCase() + event.access_strategy.slice(1)}
                {event.access_strategy === 'limited' && event.access_limit && 
                  ` (Limit: ${event.access_limit})`
                }
              </p>
            </div>
            
            <div>
              <strong>Registration Period:</strong>
              <p style={{ marginTop: '5px', color: '#5f6b7a' }}>
                <strong>From:</strong> {formatDateTime(event.accessible_from)}
                <br />
                <strong>To:</strong> {formatDateTime(event.accessible_to)}
              </p>
            </div>
            
            {event.options && event.options.length > 0 && (
              <div>
                <strong>Requirements:</strong>
                <div style={{ marginTop: '5px' }}>
                  <SpaceBetween direction="horizontal" size="xs">
                    {event.options.map((option, index) => (
                      <Badge key={index} color="red">
                        {option.replace('_', ' ').toUpperCase()}
                      </Badge>
                    ))}
                  </SpaceBetween>
                </div>
              </div>
            )}
          </SpaceBetween>
        </Box>
      </SpaceBetween>
    </div>
  );
}

export default EventPage
