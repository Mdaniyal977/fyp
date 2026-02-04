import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const templates = {
  all: [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional design with modern typography',
      category: 'Professional',
      color: '#6366f1',
      preview: 'modern',
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional layout perfect for corporate positions',
      category: 'Professional',
      color: '#1e293b',
      preview: 'classic',
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold design for creative professionals',
      category: 'Creative',
      color: '#ec4899',
      preview: 'creative',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant minimalist design',
      category: 'Professional',
      color: '#64748b',
      preview: 'minimal',
    },
    {
      id: 'it-professional',
      name: 'IT Professional',
      description: 'Perfect for software developers and tech roles',
      category: 'IT',
      color: '#3b82f6',
      preview: 'it',
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Eye-catching design for marketing professionals',
      category: 'Marketing',
      color: '#f59e0b',
      preview: 'marketing',
    },
    {
      id: 'designer',
      name: 'Designer',
      description: 'Creative layout for designers and artists',
      category: 'Creative',
      color: '#8b5cf6',
      preview: 'designer',
    },
    {
      id: 'student',
      name: 'Student',
      description: 'Perfect for freshers and students',
      category: 'Student',
      color: '#10b981',
      preview: 'student',
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Executive style for managers and leaders',
      category: 'Professional',
      color: '#ef4444',
      preview: 'manager',
    },
    {
      id: 'ats-friendly',
      name: 'ATS Friendly',
      description: 'Optimized for Applicant Tracking Systems',
      category: 'Professional',
      color: '#06b6d4',
      preview: 'ats',
    },
    {
      id: 'two-column',
      name: 'Two Column',
      description: 'Sidebar layout with better space utilization',
      category: 'Professional',
      color: '#6366f1',
      preview: 'twocolumn',
    },
    {
      id: 'colorful',
      name: 'Colorful',
      description: 'Vibrant design with color accents',
      category: 'Creative',
      color: '#f97316',
      preview: 'colorful',
    },
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Sophisticated design for senior professionals',
      category: 'Professional',
      color: '#6b7280',
      preview: 'elegant',
    },
    {
      id: 'bold',
      name: 'Bold',
      description: 'Strong visual impact for standout applications',
      category: 'Creative',
      color: '#dc2626',
      preview: 'bold',
    },
    {
      id: 'academic',
      name: 'Academic',
      description: 'Formal layout for academic and research positions',
      category: 'Student',
      color: '#1e40af',
      preview: 'academic',
    },
    {
      id: 'sidebar-left',
      name: 'Sidebar Left',
      description: 'Professional layout with left sidebar for contact & skills',
      category: 'Professional',
      color: '#2563eb',
      preview: 'sidebar',
    },
    {
      id: 'centered-clean',
      name: 'Centered Clean',
      description: 'Minimal centered design with elegant spacing',
      category: 'Professional',
      color: '#1e293b',
      preview: 'centered',
    },
    {
      id: 'card-based',
      name: 'Card Based',
      description: 'Modern card-based sections with shadows',
      category: 'Modern',
      color: '#8b5cf6',
      preview: 'card',
    },
  ],
};

const TemplatePreview = ({ template }) => {
  const previews = {
    modern: (
      <Box sx={{ p: 2, bgcolor: template.color, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ width: '100%', height: 12, bgcolor: 'white', borderRadius: 1 }} />
        <Box sx={{ width: '70%', height: 8, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
        <Box sx={{ width: '60%', height: 8, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
        <Box sx={{ mt: 1, display: 'flex', gap: 0.5 }}>
          <Box sx={{ width: 25, height: 25, bgcolor: 'rgba(255,255,255,0.6)', borderRadius: 1 }} />
          <Box sx={{ width: 25, height: 25, bgcolor: 'rgba(255,255,255,0.6)', borderRadius: 1 }} />
        </Box>
      </Box>
    ),
    classic: (
      <Box sx={{ p: 2, bgcolor: '#1e293b', borderRadius: 0, height: '100%', border: '2px solid #1e293b' }}>
        <Box sx={{ width: '100%', height: 14, bgcolor: 'white', mb: 1 }} />
        <Box sx={{ width: '100%', height: 2, bgcolor: '#1e293b', mb: 1 }} />
        <Box sx={{ width: '80%', height: 6, bgcolor: '#e5e7eb', mb: 0.5 }} />
        <Box sx={{ width: '70%', height: 6, bgcolor: '#e5e7eb', mb: 0.5 }} />
      </Box>
    ),
    creative: (
      <Box sx={{ p: 2, bgcolor: template.color, borderRadius: 3, height: '100%', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -10, right: -10, width: 60, height: 60, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
        <Box sx={{ width: '60%', height: 10, bgcolor: 'white', borderRadius: 2, mb: 1 }} />
        <Box sx={{ width: '80%', height: 6, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1, mb: 0.5 }} />
        <Box sx={{ width: '50%', height: 6, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
      </Box>
    ),
    minimal: (
      <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, height: '100%', border: '1px solid #e5e7eb' }}>
        <Box sx={{ width: '50%', height: 8, bgcolor: '#64748b', mx: 'auto', mb: 2 }} />
        <Box sx={{ width: '100%', height: 1, bgcolor: '#e5e7eb', mb: 1 }} />
        <Box sx={{ width: '70%', height: 5, bgcolor: '#f1f5f9', mb: 0.5 }} />
        <Box sx={{ width: '60%', height: 5, bgcolor: '#f1f5f9', mb: 0.5 }} />
      </Box>
    ),
    it: (
      <Box sx={{ p: 2, bgcolor: '#3b82f6', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ width: '100%', height: 10, bgcolor: 'white', borderRadius: 1 }} />
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box sx={{ flex: 1, height: 40, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 1 }} />
          <Box sx={{ flex: 1, height: 40, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 1 }} />
        </Box>
        <Box sx={{ width: '80%', height: 6, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
      </Box>
    ),
    marketing: (
      <Box sx={{ p: 2, bgcolor: '#f59e0b', borderRadius: 2, height: '100%', position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 5, right: 5, width: 30, height: 30, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: '50%' }} />
        <Box sx={{ width: '70%', height: 10, bgcolor: 'white', borderRadius: 2, mb: 1 }} />
        <Box sx={{ width: '100%', height: 4, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 1, mb: 0.5 }} />
        <Box sx={{ width: '90%', height: 4, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 1 }} />
      </Box>
    ),
    designer: (
      <Box sx={{ p: 2, bgcolor: '#8b5cf6', borderRadius: 3, height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
        <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2, p: 1 }}>
          <Box sx={{ width: '100%', height: 6, bgcolor: 'white', borderRadius: 1, mb: 0.5 }} />
          <Box sx={{ width: '70%', height: 4, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
        </Box>
        <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2, p: 1 }}>
          <Box sx={{ width: '100%', height: 6, bgcolor: 'white', borderRadius: 1, mb: 0.5 }} />
          <Box sx={{ width: '70%', height: 4, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
        </Box>
      </Box>
    ),
    student: (
      <Box sx={{ p: 2, bgcolor: '#10b981', borderRadius: 2, height: '100%', border: '3px solid white' }}>
        <Box sx={{ width: '60%', height: 8, bgcolor: 'white', borderRadius: 1, mx: 'auto', mb: 1 }} />
        <Box sx={{ width: '100%', height: 2, bgcolor: 'white', mb: 1 }} />
        <Box sx={{ width: '80%', height: 5, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1, mb: 0.5 }} />
        <Box sx={{ width: '70%', height: 5, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
      </Box>
    ),
    manager: (
      <Box sx={{ p: 2, bgcolor: '#ef4444', borderRadius: 1, height: '100%', border: '4px solid white' }}>
        <Box sx={{ width: '100%', height: 12, bgcolor: 'white', mb: 1 }} />
        <Box sx={{ width: '100%', height: 3, bgcolor: '#ef4444', mb: 1 }} />
        <Box sx={{ width: '85%', height: 5, bgcolor: '#fecaca', mb: 0.5 }} />
        <Box sx={{ width: '75%', height: 5, bgcolor: '#fecaca' }} />
      </Box>
    ),
    ats: (
      <Box sx={{ p: 2, borderRadius: 1, height: '100%', bgcolor: 'white', border: '2px solid #06b6d4' }}>
        <Box sx={{ width: '100%', height: 10, bgcolor: '#06b6d4', mb: 1 }} />
        <Box sx={{ width: '100%', height: 4, bgcolor: '#e0f2fe', mb: 0.5 }} />
        <Box sx={{ width: '100%', height: 4, bgcolor: '#e0f2fe', mb: 0.5 }} />
        <Box sx={{ width: '100%', height: 4, bgcolor: '#e0f2fe' }} />
      </Box>
    ),
    twocolumn: (
      <Box sx={{ p: 1, bgcolor: '#6366f1', borderRadius: 2, height: '100%', display: 'flex', gap: 1 }}>
        <Box sx={{ flex: '0 0 30%', bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 1, p: 1 }}>
          <Box sx={{ width: '100%', height: 6, bgcolor: 'white', borderRadius: 1, mb: 0.5 }} />
          <Box sx={{ width: '80%', height: 4, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
        </Box>
        <Box sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1, p: 1 }}>
          <Box sx={{ width: '100%', height: 4, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1, mb: 0.5 }} />
          <Box sx={{ width: '90%', height: 4, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
        </Box>
      </Box>
    ),
    colorful: (
      <Box sx={{ p: 2, borderRadius: 2, height: '100%', background: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)' }}>
        <Box sx={{ width: '70%', height: 8, bgcolor: 'white', borderRadius: 2, mb: 1 }} />
        <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: '50%' }} />
          <Box sx={{ width: 20, height: 20, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: '50%' }} />
          <Box sx={{ width: 20, height: 20, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: '50%' }} />
        </Box>
        <Box sx={{ width: '80%', height: 5, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 1 }} />
      </Box>
    ),
    elegant: (
      <Box sx={{ p: 2, bgcolor: '#6b7280', borderRadius: 1, height: '100%', border: '1px solid #374151' }}>
        <Box sx={{ width: '50%', height: 10, bgcolor: 'white', mx: 'auto', mb: 2 }} />
        <Box sx={{ width: '100%', height: 1, bgcolor: '#9ca3af', mb: 1 }} />
        <Box sx={{ width: '75%', height: 4, bgcolor: '#e5e7eb', mb: 0.5 }} />
        <Box sx={{ width: '65%', height: 4, bgcolor: '#e5e7eb' }} />
      </Box>
    ),
    bold: (
      <Box sx={{ p: 2, bgcolor: '#dc2626', borderRadius: 0, height: '100%', border: '5px solid white' }}>
        <Box sx={{ width: '100%', height: 14, bgcolor: 'white', mb: 1 }} />
        <Box sx={{ width: '100%', height: 4, bgcolor: '#dc2626', mb: 1 }} />
        <Box sx={{ width: '90%', height: 5, bgcolor: '#fee2e2', mb: 0.5 }} />
        <Box sx={{ width: '80%', height: 5, bgcolor: '#fee2e2' }} />
      </Box>
    ),
    academic: (
      <Box sx={{ p: 2, borderRadius: 1, height: '100%', bgcolor: 'white', border: '2px solid #1e40af' }}>
        <Box sx={{ width: '100%', height: 2, bgcolor: '#1e40af', mb: 1 }} />
        <Box sx={{ width: '60%', height: 8, bgcolor: '#1e40af', mx: 'auto', mb: 1 }} />
        <Box sx={{ width: '100%', height: 1, bgcolor: '#93c5fd', mb: 1 }} />
        <Box sx={{ width: '85%', height: 4, bgcolor: '#dbeafe', mb: 0.5 }} />
        <Box sx={{ width: '75%', height: 4, bgcolor: '#dbeafe' }} />
      </Box>
    ),
    sidebar: (
      <Box sx={{ p: 1, borderRadius: 1, height: '100%', display: 'flex', gap: 0.5 }}>
        <Box sx={{ width: '35%', bgcolor: '#2563eb', borderRadius: 1, p: 1 }}>
          <Box sx={{ width: '80%', height: 6, bgcolor: 'white', borderRadius: 1, mb: 0.5, mx: 'auto' }} />
          <Box sx={{ width: '60%', height: 3, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1, mx: 'auto', mb: 1 }} />
          <Box sx={{ width: '90%', height: 2, bgcolor: 'rgba(255,255,255,0.6)', borderRadius: 1, mx: 'auto', mb: 0.5 }} />
          <Box sx={{ width: '90%', height: 2, bgcolor: 'rgba(255,255,255,0.6)', borderRadius: 1, mx: 'auto' }} />
        </Box>
        <Box sx={{ flex: 1, bgcolor: 'white', borderRadius: 1, p: 1 }}>
          <Box sx={{ width: '100%', height: 4, bgcolor: '#2563eb', borderRadius: 1, mb: 0.5 }} />
          <Box sx={{ width: '90%', height: 3, bgcolor: '#e5e7eb', borderRadius: 1, mb: 0.5 }} />
          <Box sx={{ width: '85%', height: 3, bgcolor: '#e5e7eb', borderRadius: 1 }} />
        </Box>
      </Box>
    ),
    centered: (
      <Box sx={{ p: 2, borderRadius: 1, height: '100%', bgcolor: 'white', textAlign: 'center' }}>
        <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: '#1e293b', mx: 'auto', mb: 1 }} />
        <Box sx={{ width: '60%', height: 4, bgcolor: '#1e293b', mx: 'auto', mb: 0.5 }} />
        <Box sx={{ width: '40%', height: 3, bgcolor: '#64748b', mx: 'auto', mb: 2 }} />
        <Box sx={{ width: '70%', height: 2, bgcolor: '#e5e7eb', mx: 'auto', mb: 1 }} />
        <Box sx={{ width: '50%', height: 3, bgcolor: '#f1f5f9', mx: 'auto', mb: 0.5 }} />
        <Box sx={{ width: '50%', height: 3, bgcolor: '#f1f5f9', mx: 'auto' }} />
      </Box>
    ),
    card: (
      <Box sx={{ p: 1.5, borderRadius: 1, height: '100%', bgcolor: '#f8fafc' }}>
        <Box sx={{ bgcolor: '#8b5cf6', borderRadius: 1, p: 1, mb: 0.5 }}>
          <Box sx={{ width: '70%', height: 4, bgcolor: 'white', borderRadius: 1, mx: 'auto', mb: 0.5 }} />
          <Box sx={{ width: '50%', height: 2, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1, mx: 'auto' }} />
        </Box>
        <Box sx={{ bgcolor: 'white', borderRadius: 1, p: 0.75, mb: 0.5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Box sx={{ width: '100%', height: 2, bgcolor: '#8b5cf6', borderRadius: 0.5, mb: 0.5 }} />
          <Box sx={{ width: '90%', height: 2, bgcolor: '#e5e7eb', borderRadius: 0.5 }} />
        </Box>
        <Box sx={{ bgcolor: 'white', borderRadius: 1, p: 0.75, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Box sx={{ width: '100%', height: 2, bgcolor: '#8b5cf6', borderRadius: 0.5, mb: 0.5 }} />
          <Box sx={{ width: '85%', height: 2, bgcolor: '#e5e7eb', borderRadius: 0.5 }} />
        </Box>
      </Box>
    ),
  };

  return previews[template.preview] || previews.modern;
};

const CVTemplateSelector = ({ open, onClose, onSelect, selectedTemplate }) => {
  const [category, setCategory] = React.useState('all');

  const categories = ['all', 'Professional', 'IT', 'Creative', 'Marketing', 'Student', 'Modern'];

  const filteredTemplates = category === 'all' 
    ? templates.all 
    : templates.all.filter(t => t.category === category);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Typography variant="h5" fontWeight={600}>
          Choose CV Template
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Select a template that best represents your professional style
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={category}
            onChange={(e, newValue) => setCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((cat) => (
              <Tab key={cat} label={cat} value={cat} />
            ))}
          </Tabs>
        </Box>

        <Grid container spacing={3}>
          {filteredTemplates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  border: selectedTemplate === template.id ? 3 : 1,
                  borderColor: selectedTemplate === template.id ? template.color : 'divider',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: template.color,
                    boxShadow: `0 8px 24px ${template.color}40`,
                  },
                }}
                onClick={() => onSelect(template.id)}
              >
                {selectedTemplate === template.id && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 1,
                    }}
                  >
                    <CheckCircleIcon
                      sx={{
                        color: template.color,
                        fontSize: 32,
                        bgcolor: 'white',
                        borderRadius: '50%',
                      }}
                    />
                  </Box>
                )}
                <Box sx={{ height: 180, p: 1 }}>
                  <TemplatePreview template={template} />
                </Box>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {template.name}
                    </Typography>
                    <Chip
                      label={template.category}
                      size="small"
                      sx={{
                        bgcolor: `${template.color}15`,
                        color: template.color,
                        fontWeight: 600,
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {template.description}
                  </Typography>
                  <Chip
                    label="Free"
                    size="small"
                    sx={{
                      bgcolor: `${template.color}15`,
                      color: template.color,
                      fontWeight: 600,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (selectedTemplate) {
                onSelect(selectedTemplate);
                onClose();
              }
            }}
            variant="contained"
            disabled={!selectedTemplate}
          >
            Use Template
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CVTemplateSelector;
