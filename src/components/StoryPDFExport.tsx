import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8b5cf6',
    textAlign: 'center',
  },
  metadata: {
    fontSize: 10,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 12,
    lineHeight: 1.6,
    textAlign: 'justify',
    marginBottom: 15,
  },
  moral: {
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f3f4f6',
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    textAlign: 'center',
    color: '#999',
  },
});

interface StoryPDFDocumentProps {
  title: string;
  content: string;
  theme?: string;
  date?: string;
}

const StoryPDFDocument = ({ title, content, theme, date }: StoryPDFDocumentProps) => {
  const moral = content.split('Moral:')[1]?.trim();
  const storyContent = content.split('Moral:')[0].trim();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        {(theme || date) && (
          <Text style={styles.metadata}>
            {theme && `Theme: ${theme}`}
            {theme && date && ' • '}
            {date && `Created: ${date}`}
          </Text>
        )}
        <Text style={styles.content}>{storyContent}</Text>
        {moral && (
          <View style={styles.moral}>
            <Text>💡 Moral: {moral}</Text>
          </View>
        )}
        <Text style={styles.footer}>
          Created with StoryTime - Where Imagination Comes to Life ✨
        </Text>
      </Page>
    </Document>
  );
};

interface StoryPDFExportProps {
  title: string;
  content: string;
  theme?: string;
}

export const StoryPDFExport = ({ title, content, theme }: StoryPDFExportProps) => {
  const date = new Date().toLocaleDateString();
  const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_story.pdf`;

  return (
    <PDFDownloadLink
      document={<StoryPDFDocument title={title} content={content} theme={theme} date={date} />}
      fileName={fileName}
    >
      {({ loading }) => (
        <Button variant="outline" className="gap-2" disabled={loading}>
          <FileDown className="w-4 h-4" />
          {loading ? 'Preparing PDF...' : 'Download PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  );
};
