-- Create the height_results table
CREATE TABLE IF NOT EXISTS height_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  height_cm DECIMAL(5,2) NOT NULL,
  confidence DECIMAL(3,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  photo_uri TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for faster ordering
CREATE INDEX IF NOT EXISTS idx_height_results_created_at ON height_results(created_at DESC);

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_height_results_updated_at
  BEFORE UPDATE ON height_results
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE height_results ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
-- You can modify this later to add authentication-based restrictions
CREATE POLICY "Allow all operations on height_results" ON height_results
  FOR ALL USING (true);

-- Optional: Create a view for recent results
CREATE OR REPLACE VIEW recent_height_results AS
SELECT 
  id,
  name,
  height_cm,
  confidence,
  photo_uri,
  created_at,
  updated_at
FROM height_results
ORDER BY created_at DESC
LIMIT 50;