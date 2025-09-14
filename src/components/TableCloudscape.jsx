import React from 'react'
import Table from "@cloudscape-design/components/table"
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";
import Select from "@cloudscape-design/components/select";
import { orgdata } from '../constants/Organization.js';
import { eventdata } from '../constants/Events.js';
import { useNavigate } from 'react-router-dom';

function TableCloudscape() {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [selectedDataType, setSelectedDataType] = React.useState({
    label: "Organizations",
    value: "organizations"
  });

  const dataTypeOptions = [
    { label: "Organizations", value: "organizations" },
    { label: "Events", value: "events" }
  ];
  const navigate=useNavigate();

  // Determine which data to use based on selection
  const currentData = selectedDataType.value === "organizations" ? orgdata : eventdata;
  
  // Define column definitions based on data type
  const getColumnDefinitions = () => {
    if (selectedDataType.value === "organizations") {
      return [
        {
          id: "Name",
          header: "Name",
          cell: item => item.name,
          sortingField: "name",
          isRowHeader: true
        },
        {
          id: "Categories",
          header: "Categories",
          cell: item => item.tags?.join(", ") || "-",
          sortingField: "tags"
        },
        {
          id: "Website",
          header: "Website",
          cell: item => item.website_url || "-"
        },
        {
          id: "description",
          header: "Description",
          cell: item => item.description
        },
        {
          id: "Email",
          header: "Email",
          cell: item => item.email
        }
      ];
    } else {
      // Event columns - name, location, format, timings (FROM-TO), description
      return [
        {
          id: "Name",
          header: "Name",
          cell: item => item.name,
          sortingField: "name",
          isRowHeader: true
        },
        {
          id: "Location",
          header: "Location",
          cell: item => item.location
        },
        {
          id: "Format",
          header: "Format",
          cell: item => item.format
        },
        {
          id: "Timings",
          header: "Timings",
          cell: item => {
            const formatDateTime = (dateTime) => {
              const date = new Date(dateTime);
              return date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              });
            };
            return `${formatDateTime(item.begin_time)} - ${formatDateTime(item.end_time)}`;
          }
        },
        {
          id: "Description",
          header: "Description",
          cell: item => item.description
        }
      ];
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
   

    
    <Table
      renderAriaLive={({
        firstIndex,
        lastIndex,
        totalItemsCount
      }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      onSelectionChange={({ detail }) =>
        setSelectedItems(detail.selectedItems)
      }
      selectedItems={selectedItems}
      ariaLabels={{
        selectionGroupLabel: "Items selection",
        allItemsSelectionLabel: () => "select all",
        itemSelectionLabel: ({ selectedItems }, item) =>
          selectedDataType.value === "organizations" ? item.name : item.name
      }}
      columnDefinitions={getColumnDefinitions()}
      enableKeyboardNavigation
      items={currentData}
      loadingText="Loading resources"
      selectionType="single"
      trackBy="name"
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>No resources</b>
            <Button>Create resource</Button>
          </SpaceBetween>
        </Box>
      }
      filter={
        <TextFilter
          filteringPlaceholder="Find resources"
          filteringText=""
          countText="0 matches"
        />
      }
      header={
        <Header
          counter={
            selectedItems.length
              ? "(" + selectedItems.length + "/" + currentData.length + ")"
              : "(" + currentData.length + ")"
          }
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Select
                selectedOption={selectedDataType}
                onChange={({ detail }) => {
                  setSelectedDataType(detail.selectedOption);
                  setSelectedItems([]); // Clear selection when switching
                }}
                options={dataTypeOptions}
                placeholder="Choose data type"
              />
              <Button 
                onClick={() => {
                  if (selectedItems.length > 0) {
                    const selectedItem = selectedItems[0]; // Get the selected item
                    if (selectedDataType.value === "organizations") {
                      // Find the index of the selected organization (1-based for URL)
                      const orgIndex = orgdata.findIndex(org => org.name === selectedItem.name) + 1;
                      navigate(`/Organization/${orgIndex}`, { 
                        state: { organization: selectedItem } 
                      });
                    } else {
                      // For events, you can create a similar route
                      const eventIndex = eventdata.findIndex(event => event.name === selectedItem.name) + 1;
                      navigate(`/Event/${eventIndex}`, { 
                        state: { event: selectedItem } 
                      });
                    }
                  }
                }}
                disabled={selectedItems.length === 0} // Disable if nothing selected
              >
                View
              </Button>
            </SpaceBetween>
          }
        >
          {selectedDataType.label} Table
        </Header>
      }
      pagination={
        <Pagination currentPageIndex={1} pagesCount={2} />
      }
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={{
            pageSize: 10,
            contentDisplay: getColumnDefinitions().map(col => ({
              id: col.id,
              visible: true
            }))
          }}
          pageSizePreference={{
            title: "Page size",
            options: [
              { value: 10, label: "10 resources" },
              { value: 20, label: "20 resources" }
            ]
          }}
          wrapLinesPreference={{}}
          stripedRowsPreference={{}}
          contentDensityPreference={{}}
          contentDisplayPreference={{
            options: getColumnDefinitions().map(col => ({
              id: col.id,
              label: col.header,
              alwaysVisible: col.isRowHeader || false
            }))
          }}
          stickyColumnsPreference={{
            firstColumns: {
              title: "Stick first column(s)",
              description:
                "Keep the first column(s) visible while horizontally scrolling the table content.",
              options: [
                { label: "None", value: 0 },
                { label: "First column", value: 1 },
                { label: "First two columns", value: 2 }
              ]
            },
            lastColumns: {
              title: "Stick last column",
              description:
                "Keep the last column visible while horizontally scrolling the table content.",
              options: [
                { label: "None", value: 0 },
                { label: "Last column", value: 1 }
              ]
            }
          }}
        />
      }
    />
    </div>
  );
}

export default TableCloudscape