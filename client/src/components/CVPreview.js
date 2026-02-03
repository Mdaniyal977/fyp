import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  Button,
  Toolbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import { exportCVToPDF } from '../utils/pdfExport';
import { exportCVToDOCX } from '../utils/docxExport';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import CodeIcon from '@mui/icons-material/Code';
import TranslateIcon from '@mui/icons-material/Translate';
import VerifiedIcon from '@mui/icons-material/Verified';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const CVPreview = ({ cv, open, onClose, template = 'modern', customization }) => {
  if (!cv) return null;

  const currentTemplate = cv.template || template;
  const currentCustomization = cv.customization || customization || {};

  const renderTemplate = () => {
    switch (currentTemplate) {
      case 'modern':
        return <ModernTemplate cv={cv} customization={currentCustomization} />;
      case 'classic':
        return <ClassicTemplate cv={cv} customization={currentCustomization} />;
      case 'creative':
        return <CreativeTemplate cv={cv} customization={currentCustomization} />;
      case 'minimal':
        return <MinimalTemplate cv={cv} customization={currentCustomization} />;
      case 'it-professional':
        return <ITProfessionalTemplate cv={cv} customization={currentCustomization} />;
      case 'marketing':
        return <MarketingTemplate cv={cv} customization={currentCustomization} />;
      case 'designer':
        return <DesignerTemplate cv={cv} customization={currentCustomization} />;
      case 'student':
        return <StudentTemplate cv={cv} customization={currentCustomization} />;
      case 'manager':
        return <ManagerTemplate cv={cv} customization={currentCustomization} />;
      case 'ats-friendly':
        return <ATSTemplate cv={cv} customization={currentCustomization} />;
      case 'two-column':
        return <TwoColumnTemplate cv={cv} customization={currentCustomization} />;
      case 'colorful':
        return <ColorfulTemplate cv={cv} customization={currentCustomization} />;
      case 'elegant':
        return <ElegantTemplate cv={cv} customization={currentCustomization} />;
      case 'bold':
        return <BoldTemplate cv={cv} customization={currentCustomization} />;
      case 'academic':
        return <AcademicTemplate cv={cv} customization={currentCustomization} />;
      default:
        return <ModernTemplate cv={cv} customization={currentCustomization} />;
    }
  };

  const handleExportPDF = async () => {
    const cvElement = document.getElementById('cv-preview-content');
    if (cvElement) {
      const result = await exportCVToPDF(cvElement, cv?.title || 'CV');
      if (result.success) {
        alert('PDF exported successfully!');
      } else {
        alert('Failed to export PDF: ' + result.error);
      }
    }
  };

  const handleExportDOCX = async () => {
    const result = await exportCVToDOCX(cv, cv?.title || 'CV');
    if (result.success) {
      alert('DOCX exported successfully!');
    } else {
      alert('Failed to export DOCX: ' + result.error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <Toolbar
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          CV Preview - {currentTemplate.charAt(0).toUpperCase() + currentTemplate.slice(1)} Template
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            onClick={handleExportPDF}
            size="small"
          >
            PDF
          </Button>
          <Button
            variant="outlined"
            startIcon={<DescriptionIcon />}
            onClick={handleExportDOCX}
            size="small"
          >
            DOCX
          </Button>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'relative', bgcolor: 'background.paper' }}>
          <Box 
            id="cv-preview-content"
            sx={{ 
              maxHeight: '90vh', 
              overflow: 'auto', 
              p: 3,
              fontFamily: currentCustomization.fontFamily || 'Inter',
              fontSize: `${currentCustomization.fontSize || 14}px`,
              color: currentCustomization.textColor || '#1e293b',
            }}
          >
            {renderTemplate()}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to render sections
const renderSection = (title, icon, children, color = '#6366f1') => (
  <Box sx={{ mb: 3 }}>
    <Typography 
      variant="h6" 
      fontWeight={600} 
      gutterBottom 
      sx={{ 
        color: color,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {icon}
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    {children}
  </Box>
);

// Modern Template
const ModernTemplate = ({ cv, customization }) => (
  <Paper
    elevation={0}
    sx={{
      maxWidth: 210 * 3.78,
      minHeight: 297 * 3.78,
      mx: 'auto',
      p: 4,
      bgcolor: 'white',
      lineHeight: customization?.lineSpacing || 1.5,
    }}
  >
    {/* Header */}
    <Box
      sx={{
        bgcolor: customization?.headingColor || 'primary.main',
        color: 'white',
        p: 3,
        borderRadius: 2,
        mb: 3,
        display: 'flex',
        gap: 3,
        alignItems: 'center',
      }}
    >
      {cv.personalInfo?.photo && (
        <Box
          component="img"
          src={cv.personalInfo.photo}
          alt="Profile"
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid rgba(255,255,255,0.3)',
            flexShrink: 0,
          }}
        />
      )}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {cv.personalInfo?.fullName || 'Your Name'}
        </Typography>
        {cv.personalInfo?.jobTitle && (
          <Typography variant="h6" sx={{ opacity: 0.95, mb: 0.5, fontWeight: 500 }}>
            {cv.personalInfo.jobTitle}
          </Typography>
        )}
        <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
          {cv.personalInfo?.email || 'your.email@example.com'}
        </Typography>
        <Grid container spacing={2}>
          {cv.personalInfo?.phone && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">{cv.personalInfo.phone}</Typography>
              </Box>
            </Grid>
          )}
          {cv.personalInfo?.address && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">{cv.personalInfo.address}</Typography>
              </Box>
            </Grid>
          )}
          {cv.personalInfo?.linkedIn && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinkedInIcon fontSize="small" />
                <Typography variant="body2">{cv.personalInfo.linkedIn}</Typography>
              </Box>
            </Grid>
          )}
          {cv.personalInfo?.website && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageIcon fontSize="small" />
                <Typography variant="body2">{cv.personalInfo.website}</Typography>
              </Box>
            </Grid>
          )}
          {cv.personalInfo?.github && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GitHubIcon fontSize="small" />
                <Typography variant="body2">{cv.personalInfo.github}</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>

    {/* Professional Summary */}
    {cv.professionalSummary && renderSection(
      'Professional Summary',
      null,
      <Typography variant="body1" sx={{ lineHeight: customization?.lineSpacing || 1.8 }}>
        {cv.professionalSummary}
      </Typography>,
      customization?.headingColor
    )}

    {/* Work Experience */}
    {cv.workExperience?.length > 0 && renderSection(
      'Work Experience',
      <WorkIcon sx={{ verticalAlign: 'middle' }} />,
      cv.workExperience.map((exp, idx) => (
        <Box key={idx} sx={{ mb: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 1 }}>
              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {exp.position || 'Position'}
                </Typography>
                {exp.designation && (
                  <Box sx={{ mb: 0.5 }}>
                    <Chip 
                      label={exp.designation} 
                      size="small" 
                      sx={{ 
                        bgcolor: `${customization?.headingColor || '#6366f1'}15`,
                        color: customization?.headingColor || '#6366f1',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        height: 26,
                        '& .MuiChip-label': {
                          px: 1.5
                        }
                      }} 
                    />
                  </Box>
                )}
                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 500 }}>
                  {exp.company || 'Company Name'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                {exp.startDate || 'Start'} - {exp.current ? 'Present' : (exp.endDate || 'End')}
              </Typography>
            </Box>
          </Box>
          {exp.description && (
            <Typography variant="body2" sx={{ mb: 1, lineHeight: customization?.lineSpacing || 1.6 }}>
              {exp.description}
            </Typography>
          )}
          {exp.achievements?.length > 0 && (
            <Box component="ul" sx={{ pl: 2, mt: 1 }}>
              {exp.achievements.map((ach, i) => (
                <li key={i}>
                  <Typography variant="body2">{ach}</Typography>
                </li>
              ))}
            </Box>
          )}
        </Box>
      )),
      customization?.headingColor
    )}

    {/* Education */}
    {cv.education?.length > 0 && renderSection(
      'Education',
      <SchoolIcon sx={{ verticalAlign: 'middle' }} />,
      cv.education.map((edu, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {edu.degree} {edu.field && `in ${edu.field}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {edu.startDate} - {edu.endDate}
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="primary.main">
            {edu.institution}
          </Typography>
          {edu.gpa && (
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              GPA: {edu.gpa}
            </Typography>
          )}
        </Box>
      )),
      customization?.headingColor
    )}

    {/* Skills */}
    {cv.skills?.length > 0 && renderSection(
      'Skills',
      <CodeIcon sx={{ verticalAlign: 'middle' }} />,
      cv.skills.map((skill, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            {skill.category || 'Skill Category'}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {skill.items?.map((item, i) => {
              const skillName = typeof item === 'string' ? item : (item.name || 'Skill');
              const skillLevel = typeof item === 'object' && item.level ? item.level : 'intermediate';
              const levelPercent = skillLevel === 'beginner' ? 25 : 
                                  skillLevel === 'intermediate' ? 50 : 
                                  skillLevel === 'advanced' ? 75 : 100;
              
              return (
                <Box key={i} sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {skillName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                      {skillLevel}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ flex: 1, height: 8, bgcolor: '#e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                      <Box
                        sx={{
                          height: '100%',
                          bgcolor: customization?.headingColor || 'primary.main',
                          width: `${levelPercent}%`,
                          transition: 'width 0.3s ease',
                          borderRadius: 1
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ minWidth: 35 }}>
                      {levelPercent}%
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )),
      customization?.headingColor
    )}

    {/* Certifications */}
    {cv.certifications?.length > 0 && renderSection(
      'Certifications',
      <VerifiedIcon sx={{ verticalAlign: 'middle' }} />,
      cv.certifications.map((cert, idx) => (
        <Box key={idx} sx={{ mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {cert.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cert.issuer} {cert.date && `• ${cert.date}`}
          </Typography>
        </Box>
      )),
      customization?.headingColor
    )}

    {/* Languages */}
    {cv.languages?.length > 0 && renderSection(
      'Languages',
      <TranslateIcon sx={{ verticalAlign: 'middle' }} />,
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {cv.languages.map((lang, idx) => (
          <Chip
            key={idx}
            label={`${lang.language} - ${lang.proficiency}`}
            size="small"
            variant="outlined"
          />
        ))}
      </Box>,
      customization?.headingColor
    )}

    {/* Projects */}
    {cv.projects?.length > 0 && renderSection(
      'Projects',
      <StarIcon sx={{ verticalAlign: 'middle' }} />,
      cv.projects.map((project, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            {project.name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, lineHeight: customization?.lineSpacing || 1.6 }}>
            {project.description}
          </Typography>
          {project.technologies?.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
              {project.technologies.map((tech, i) => (
                <Chip key={i} label={tech} size="small" />
              ))}
            </Box>
          )}
          {project.link && (
            <Typography variant="body2" color="primary.main">
              {project.link}
            </Typography>
          )}
        </Box>
      )),
      customization?.headingColor
    )}

    {/* Hobbies */}
    {cv.hobbies?.length > 0 && renderSection(
      'Hobbies & Interests',
      null,
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {cv.hobbies.map((hobby, idx) => (
          <Chip
            key={idx}
            label={hobby}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Box>,
      customization?.headingColor
    )}

    {/* References */}
    {cv.references?.length > 0 && renderSection(
      'References',
      <PersonIcon sx={{ verticalAlign: 'middle' }} />,
      cv.references.map((ref, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            {ref.name || 'Reference Name'}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {ref.jobTitle && `${ref.jobTitle}`}
            {ref.company && ` at ${ref.company}`}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {ref.email && (
              <Typography variant="body2">
                📧 {ref.email}
              </Typography>
            )}
            {ref.phone && (
              <Typography variant="body2">
                📞 {ref.phone}
              </Typography>
            )}
            {ref.relationship && (
              <Chip label={ref.relationship} size="small" variant="outlined" />
            )}
          </Box>
        </Box>
      )),
      customization?.headingColor
    )}

    {/* Awards & Honors */}
    {cv.awards?.length > 0 && renderSection(
      'Awards & Honors',
      <EmojiEventsIcon sx={{ verticalAlign: 'middle' }} />,
      cv.awards.map((award, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {award.name || 'Award Name'}
            </Typography>
            {award.date && (
              <Typography variant="body2" color="text.secondary">
                {award.date}
              </Typography>
            )}
          </Box>
          <Typography variant="body2" color="primary.main" gutterBottom>
            {award.organization || 'Organization'}
          </Typography>
          {award.category && (
            <Chip 
              label={award.category} 
              size="small" 
              sx={{ mr: 1, mb: 1 }}
              variant="outlined"
            />
          )}
          {award.description && (
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {award.description}
            </Typography>
          )}
        </Box>
      )),
      customization?.headingColor
    )}
  </Paper>
);

// Classic Template - More formal, traditional
const ClassicTemplate = ({ cv, customization }) => (
  <Paper
    elevation={0}
    sx={{
      maxWidth: 210 * 3.78,
      minHeight: 297 * 3.78,
      mx: 'auto',
      p: 4,
      bgcolor: 'white',
      border: '2px solid #1e293b',
    }}
  >
    <Box sx={{ borderBottom: '3px solid #1e293b', pb: 2, mb: 3 }}>
      <Typography variant="h3" fontWeight={700} align="center" sx={{ color: '#1e293b' }}>
        {cv.personalInfo?.fullName || 'Your Name'}
      </Typography>
      {cv.personalInfo?.jobTitle && (
        <Typography variant="h6" align="center" sx={{ color: '#475569', mt: 0.5 }}>
          {cv.personalInfo.jobTitle}
        </Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 1 }}>
        {cv.personalInfo?.email && <Typography variant="body2">{cv.personalInfo.email}</Typography>}
        {cv.personalInfo?.phone && <Typography variant="body2">{cv.personalInfo.phone}</Typography>}
        {cv.personalInfo?.address && <Typography variant="body2">{cv.personalInfo.address}</Typography>}
      </Box>
    </Box>
    {cv.professionalSummary && (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ borderBottom: '2px solid #1e293b', pb: 0.5, mb: 1 }}>
          PROFESSIONAL SUMMARY
        </Typography>
        <Typography variant="body1">{cv.professionalSummary}</Typography>
      </Box>
    )}
    {/* Add other sections similarly */}
    <ModernTemplate cv={cv} customization={customization} />
  </Paper>
);

// Creative Template - Colorful and bold
const CreativeTemplate = ({ cv, customization }) => (
  <Paper
    elevation={0}
    sx={{
      maxWidth: 210 * 3.78,
      minHeight: 297 * 3.78,
      mx: 'auto',
      p: 4,
      bgcolor: 'white',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundSize: 'cover',
    }}
  >
    <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 2 }}>
      <ModernTemplate cv={cv} customization={{ ...customization, headingColor: '#ec4899' }} />
    </Box>
  </Paper>
);

// Minimal Template - Clean and simple
const MinimalTemplate = ({ cv, customization }) => (
  <Paper
    elevation={0}
    sx={{
      maxWidth: 210 * 3.78,
      minHeight: 297 * 3.78,
      mx: 'auto',
      p: 4,
      bgcolor: 'white',
    }}
  >
    <Box sx={{ textAlign: 'center', mb: 4, borderBottom: '1px solid #e5e7eb', pb: 2 }}>
      <Typography variant="h4" fontWeight={300} sx={{ letterSpacing: 2 }}>
        {cv.personalInfo?.fullName || 'Your Name'}
      </Typography>
      {cv.personalInfo?.jobTitle && (
        <Typography variant="subtitle1" sx={{ mt: 0.5, color: '#64748b' }}>
          {cv.personalInfo.jobTitle}
        </Typography>
      )}
      <Typography variant="body2" sx={{ mt: 1, color: '#64748b' }}>
        {cv.personalInfo?.email || 'your.email@example.com'}
      </Typography>
    </Box>
    <ModernTemplate cv={cv} customization={{ ...customization, headingColor: '#64748b' }} />
  </Paper>
);

// Other templates - using ModernTemplate as base with different styling
const ITProfessionalTemplate = ({ cv, customization }) => (
  <ModernTemplate cv={cv} customization={{ ...customization, headingColor: '#3b82f6' }} />
);

const MarketingTemplate = ({ cv, customization }) => (
  <ModernTemplate cv={cv} customization={{ ...customization, headingColor: '#f59e0b' }} />
);

const DesignerTemplate = ({ cv, customization }) => (
  <ModernTemplate cv={cv} customization={{ ...customization, headingColor: '#8b5cf6' }} />
);

const StudentTemplate = ({ cv, customization }) => (
  <ModernTemplate cv={cv} customization={{ ...customization, headingColor: '#10b981' }} />
);

const ManagerTemplate = ({ cv, customization }) => (
  <ModernTemplate cv={cv} customization={{ ...customization, headingColor: '#ef4444' }} />
);

const ATSTemplate = ({ cv, customization }) => (
  <ModernTemplate cv={cv} customization={{ ...customization, headingColor: '#06b6d4' }} />
);

const TwoColumnTemplate = ({ cv, customization }) => (
  <Paper sx={{ maxWidth: 210 * 3.78, mx: 'auto', p: 4, bgcolor: 'white' }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Box sx={{ bgcolor: customization?.headingColor || '#6366f1', color: 'white', p: 2, borderRadius: 2 }}>
          <Typography variant="h5" fontWeight={700}>
            {cv.personalInfo?.fullName || 'Your Name'}
          </Typography>
          {cv.personalInfo?.jobTitle && (
            <Typography variant="body2" sx={{ opacity: 0.95, mt: 0.5 }}>
              {cv.personalInfo.jobTitle}
            </Typography>
          )}
          {/* Sidebar content */}
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <ModernTemplate cv={cv} customization={customization} />
      </Grid>
    </Grid>
  </Paper>
);

const ColorfulTemplate = ({ cv, customization }) => (
  <ModernTemplate cv={cv} customization={{ ...customization, headingColor: '#f97316' }} />
);

const ElegantTemplate = ({ cv, customization }) => (
  <ModernTemplate cv={cv} customization={{ ...customization, headingColor: '#6b7280' }} />
);

const BoldTemplate = ({ cv, customization }) => (
  <ModernTemplate cv={cv} customization={{ ...customization, headingColor: '#dc2626' }} />
);

const AcademicTemplate = ({ cv, customization }) => (
  <ModernTemplate cv={cv} customization={{ ...customization, headingColor: '#1e40af' }} />
);

export default CVPreview;
