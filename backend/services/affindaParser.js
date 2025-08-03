const fetch = require('node-fetch');
const FormData = require('form-data');

async function parseResumeWithAffinda(buffer, filename) {
  const apiKey = process.env.AFFINDA_API_KEY;
  console.log('🔍 Starting Affinda parsing for:', filename);
  console.log('🔑 API Key present:', !!apiKey);
  
  const form = new FormData();
  form.append('file', buffer, filename);

  try {
    console.log('📤 Sending request to Affinda API...');
    const response = await fetch('https://api.affinda.com/v2/resumes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        ...form.getHeaders()
      },
      body: form
    });

    console.log('📥 Affinda API Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Affinda API Error:', errorText);
      throw new Error(`Affinda API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📊 Raw Affinda Response:', JSON.stringify(data, null, 2));
    
    // Map Affinda response to our expected format
    const mappedData = mapAffindaResponse(data);
    console.log('🎯 Mapped Data:', JSON.stringify(mappedData, null, 2));
    
    return mappedData;
  } catch (error) {
    console.error('💥 Affinda parsing error:', error);
    throw error;
  }
}

function mapAffindaResponse(affindaData) {
  try {
    console.log('🔍 Mapping Affinda response structure...');
    console.log('📋 Response keys:', Object.keys(affindaData));
    
    // Handle different possible response structures
    let data = affindaData;
    
    // If response has a 'data' property, use that
    if (affindaData.data) {
      data = affindaData.data;
      console.log('📋 Data keys:', Object.keys(data));
    }
    
    // If response has a 'result' property, use that
    if (affindaData.result) {
      data = affindaData.result;
      console.log('📋 Result keys:', Object.keys(data));
    }
    
    // Handle array response (some APIs return array)
    if (Array.isArray(affindaData)) {
      data = affindaData[0] || {};
      console.log('📋 Array response, using first item');
    }
    
    console.log('🎯 Final data structure:', JSON.stringify(data, null, 2));
    
    return {
      name: data.name || data.fullName || data.firstName + ' ' + data.lastName || 'Unknown',
      email: data.emails && data.emails.length > 0 ? data.emails[0] : 
             data.email || null,
      phone: data.phoneNumbers && data.phoneNumbers.length > 0 ? data.phoneNumbers[0] : 
             data.phone || data.phoneNumber || null,
      skills: data.skills ? data.skills.map(skill => skill.name || skill) : 
             data.skillNames || [],
      experience: data.workExperience ? data.workExperience.map(exp => 
        `${exp.jobTitle || exp.title || ''} ${exp.organization || exp.company || ''} ${exp.dates ? `(${exp.dates})` : ''} ${exp.description || ''}`.trim()
      ) : [],
      education: data.education ? data.education.map(edu => 
        `${edu.degree || edu.qualification || ''} ${edu.organization || edu.institution || ''} ${edu.dates ? `(${edu.dates})` : ''}`.trim()
      ) : [],
      certifications: data.certifications ? data.certifications.map(cert => 
        `${cert.name || cert.title || ''} ${cert.issuer || cert.organization || ''} ${cert.date ? `(${cert.date})` : ''}`.trim()
      ) : [],
      projects: data.projects ? data.projects.map(proj => 
        `${proj.name || proj.title || ''} ${proj.description || ''}`.trim()
      ) : [],
      links: data.links || data.urls || data.websites || [],
      location: data.location || data.address || null,
      summary: data.summary || data.profile || data.objective || null
    };
  } catch (error) {
    console.error('💥 Error mapping Affinda response:', error);
    console.error('📋 Original data:', JSON.stringify(affindaData, null, 2));
    
    // Return a basic structure if mapping fails
    return {
      name: 'Unknown',
      email: null,
      phone: null,
      skills: [],
      experience: [],
      education: [],
      certifications: [],
      projects: [],
      links: [],
      location: null,
      summary: null
    };
  }
}

module.exports = { parseResumeWithAffinda };