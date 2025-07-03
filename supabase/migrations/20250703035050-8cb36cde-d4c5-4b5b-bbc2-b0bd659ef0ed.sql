-- Create storage bucket for marks memorandums
INSERT INTO storage.buckets (id, name, public) 
VALUES ('marks-memorandums', 'marks-memorandums', true);

-- Add memorandum_file_url to evaluations table
ALTER TABLE evaluations 
ADD COLUMN memorandum_file_url TEXT;

-- Storage policies for marks memorandums
CREATE POLICY "Anyone can view marks memorandums" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'marks-memorandums');

CREATE POLICY "Admins can upload marks memorandums" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'marks-memorandums' 
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

CREATE POLICY "Admins can update marks memorandums" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'marks-memorandums' 
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete marks memorandums" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'marks-memorandums' 
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);