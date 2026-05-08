const config = {
  expired:  { label: 'Expired',       bg: '#dc3545', color: '#fff' },
  expiring: { label: 'Expiring Soon',  bg: '#fd7e14', color: '#fff' },
  low:      { label: 'Low Stock',      bg: '#ffc107', color: '#000' },
  ok:       { label: 'OK',             bg: '#198754', color: '#fff' },
}

export default function StatusBadge({ status }) {
  const { label, bg, color } = config[status] || config.ok
  return (
    <span style={{
      background: bg, color, padding: '3px 10px',
      borderRadius: 12, fontSize: 12, fontWeight: 600
    }}>
      {label}
    </span>
  )
}
