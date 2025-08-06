interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard = ({ internship }: InternshipCardProps) => {
  const {
    _id,
    company,
    role,
    location,
    application_url,
    date_posted,
    source,
    scraped_at,
  } = internship;

  // 計算天數並轉換為 0d、1d 格式
  const calculateDaysAgo = (datePosted: string) => {
    if (!datePosted) return "";

    // 如果已經是 0d、1d 格式，直接返回
    if (datePosted.match(/^\d+d$/)) {
      return datePosted;
    }

    // 處理 "Aug 05" 格式
    const currentYear = new Date().getFullYear();
    const dateStr = `${datePosted} ${currentYear}`;
    const postedDate = new Date(dateStr);

    // 如果日期無效，返回原始值
    if (isNaN(postedDate.getTime())) {
      return datePosted;
    }

    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays}d`;
  };

  const daysAgo = calculateDaysAgo(date_posted);

  return (
    <div className="w-full border-b border-white/10 py-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-md text-white font-bold">{role}</h3>
        <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">
          {daysAgo}
        </span>
      </div>

      <div className="text-sm text-white/80 mb-2">
        <span className="font-semibold">{company}</span>
        {location && (
          <>
            <span className="text-white/50 mx-2">•</span>
            <span>{location}</span>
          </>
        )}
      </div>

      {application_url && (
        <a
          href={application_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Apply Here →
        </a>
      )}

      <div className="flex justify-between items-center mt-3 text-xs text-white/40">
        <span>Source: {source}</span>
        <span>{new Date(scraped_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default InternshipCard; 