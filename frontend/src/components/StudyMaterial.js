import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import studyMaterialData from '../data/studyMaterial.json';
import StudyMaterialCategory from './StudyMaterialCategory'; // Import the categories component

function StudyMaterial() {
  const { category, topic } = useParams(); // Grab category and topic from the URL
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  // Fetch study material based on the selected category and topic
  useEffect(() => {
    if (category && topic && studyMaterialData[category] && studyMaterialData[category][topic]) {
      setStudyMaterials([studyMaterialData[category][topic]]);
      setSelectedTopic(topic); // Ensure selectedTopic is set
      setPdfFile(studyMaterialData[category][topic].pdf); // Set the PDF file
    } else if (category && topic) {
      console.error(`Error fetching study materials for ${category} - ${topic}`);
    }
  }, [category, topic]);

  // Handle topic selection and PDF rendering
  const handleTopicClick = (topic) => {
    const material = studyMaterialData[category][topic];
    setSelectedTopic(topic);
    setPdfFile(material.pdf); // Get the PDF from studyMaterial.json
  };

  // Render study material if both category and topic are selected, otherwise render categories
  return (
    <div>
      {(!category || !topic) ? (
        // Render StudyMaterialCategory if no category or topic is selected
        <StudyMaterialCategory />
      ) : (
        // Render study material for the selected category and topic
        <>
          <h1>Study Material: {topic}</h1>
          <ul>
            {studyMaterials.map((material, index) => (
              <li key={index}>
                <h3>{material.name}</h3>
                <p>{material.description}</p>
                <button onClick={() => handleTopicClick(topic)}>View PDF</button>
              </li>
            ))}
          </ul>
          {selectedTopic && pdfFile && (
            <div>
              <h2>{selectedTopic} PDF</h2>
              {/* Render the PDF download link */}
              <a href={pdfFile} download={selectedTopic + ".pdf"}>
                Download PDF
              </a>
              {/* Optionally, you can also render an embedded PDF viewer */}
              <iframe
                src={pdfFile}
                width="100%"
                height="600px"
                style={{ border: 'none' }}
                title={`PDF Viewer - ${selectedTopic}`}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default StudyMaterial;
