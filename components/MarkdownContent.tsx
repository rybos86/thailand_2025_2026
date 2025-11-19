import React from 'react';

export const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  
  return (
    <div className="space-y-3 text-slate-700 mt-6">
      {lines.map((line, index) => {
        if (line.startsWith('### ')) {
          return <h4 key={index} className="text-lg font-bold text-thailand-700 mt-4">{line.replace('### ', '')}</h4>;
        }
        if (line.startsWith('## ')) {
          return <h3 key={index} className="text-xl font-bold text-slate-800 mt-6 border-b border-slate-200 pb-2">{line.replace('## ', '')}</h3>;
        }
        if (line.startsWith('# ')) {
          return <h2 key={index} className="text-2xl font-bold text-slate-900 mt-6">{line.replace('# ', '')}</h2>;
        }
        if (line.startsWith('- ')) {
          const text = line.replace('- ', '');
          const parts = text.split(/(\*\*.*?\*\*)/);
          return (
            <div key={index} className="flex items-start gap-2 ml-1">
              <span className="text-thailand-500 mt-1.5">•</span>
              <p className="text-sm md:text-base">
                {parts.map((part, i) => 
                  part.startsWith('**') && part.endsWith('**') 
                    ? <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong> 
                    : part
                )}
              </p>
            </div>
          );
        }
        if (line.trim() === '---') {
          return <hr key={index} className="my-6 border-slate-200" />;
        }
        if (line.trim().length > 0) {
          return <p key={index} className="text-sm md:text-base leading-relaxed">{line}</p>;
        }
        return null;
      })}
    </div>
  );
};
