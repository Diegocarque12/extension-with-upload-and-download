import React from 'react';

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  header: {
    color: '#333',
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  paragraph: {
    lineHeight: '1.6',
    color: '#555',
  },
  list: {
    paddingLeft: '20px',
  },
  listItem: {
    margin: '10px 0',
  },
};

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to Download Interceptor</h1>
      <p style={styles.paragraph}>
        This extension enhances your browsing experience by intercepting file uploads and downloads,
        providing you with additional options and control.
      </p>
      <h2>Key Features:</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>Intercepts file uploads and provides options for iManage integration</li>
        <li style={styles.listItem}>Detects file downloads and allows you to continue or cancel</li>
        <li style={styles.listItem}>Keeps track of downloaded files</li>
      </ul>
      <p style={styles.paragraph}>
        Start browsing and experience the enhanced control over your file operations!
      </p>
    </div>
  );
}

export default App;
