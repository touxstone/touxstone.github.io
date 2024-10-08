;;; syl-shell-translate-eng-spa.el --- Just a workpatch to google-translate using translate-shell.
;; Author : Syl. Montalvo
;; URL    : https://github.com/touxstone/touxstone.github.io/blob/master/syl-emacs-tips/syl-shell-translate-eng-spa.el
;; Created: Fri 15 Mar 19:22:12 GMT 2019 
;; Version: 2019.00.01

;; This file is NOT part of GNU Emacs.

;; 
;; As stated, this tool makes use of translate-shell
;; Summary      : A command-line online translator
;; URL          : https://github.com/soimort/translate-shell
;; License      : Public Domain
;; Description  : Translate Shell (formerly Google Translate CLI) is a command-line
;; : translator powered by Google Translate (default), Bing
;; : Translator, Yandex.Translate and Apertium.

;; e.g. under Fedora-29 ((Sun 10 May 09:58:57 BST 2020) Edit: also tested under fedora30 but
;; probably also onward).
;; Additional specifications: This workaround provides service between the two languages I
;; more frequently use but it has been done so that easy customising it to any
;; language-pair by just changing the variable set as source in the two last functions
;; ("eng" or "spa" in this case) to any from the list of options provided
;; here => https://github.com/soimort/translate-shell#code-list

;; INSTALLATION in your system, the case of mine, FEDORA 30: ;; Thu 21 Jan 18:48:52 GMT 2021 EDIT: FEDORA 32
;; $ sudo dnf install translate-shell

;; Afterwards, download this file and place it in your load path, then add
;; the following line to your emacs.d init file:

;; (require 'syl-shell-translate-eng-spa)

;;; Code:

(defun translate-to-any (x y)
  (interactive)
  (let ((tr (shell-command-to-string
             (format "trans :%s %s" x y))))
    (let ((temp-buff (get-buffer-create "*my-buff*")))
      (when (get-buffer "*my-buff*")
        (switch-to-buffer-other-window temp-buff))
      (set-buffer temp-buff)
      (with-current-buffer temp-buff
        (read-only-mode -1)
        (setf (buffer-string) "")
        (insert tr) 
        (goto-char (point-min))
        (read-only-mode)
        (local-set-key [backspace] 'scroll-down)
        (local-set-key "" 'scroll-up)
        (local-set-key (kbd "q") 'delete-window)))))

;; (defun translate-to-eng0 ()
;;   (interactive)
;;   (translate-to-any "eng"
;;                     (read-string "what?.." ))) ;;Version0 ~~`

(defun translate-to-eng (x)
  (interactive
   (let ((w (if mark-active
                (buffer-substring
                 (region-beginning) (region-end))
              (word-at-point))))
     (list
      (read-string
       (format "translate to eng: (%s):" w) nil nil w))))
  (translate-to-any "eng" x))

(defun translate-to-spa (x)
  (interactive
   (let ((w (if mark-active
                (buffer-substring
                 (region-beginning) (region-end))
              (word-at-point))))
     (list
      (read-string
       (format "reverso translate: (%s):" w) nil nil w))))
  (translate-to-any "spa" x))


(global-set-key (kbd "\C-ct") 'translate-to-eng)
(global-set-key (kbd "\C-cr") 'translate-to-spa)


(provide 'syl-shell-translate-eng-spa)

;;; syl-shell-translate-eng-spa.el ends here.
